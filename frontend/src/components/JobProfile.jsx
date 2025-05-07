import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const JobProfile = ({ userData, isOwnProfile }) => {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    description: '',
    requirements: '', // Comma separated requirements
  });

  let messageApplicants = "";

  if(isOwnProfile) {
    messageApplicants = "self";
  }

  console.log("userData : ", userData);

  // Fetch jobs posted by the current user using the poster id
  const {
    data: postedJobs,
    isLoading: postedJobsLoading,
    isError: postedJobsError,
    error: postedJobsErrorMsg,
  } = useQuery({
    queryKey: ['postedJobs', userData?._id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/jobs/poster/${userData._id}`);
      console.log("posted jobs : ", data);
      return data;
    },
    enabled: !!userData._id,
  });

  

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Convert salary to number and requirements to an array
    const payload = {
      ...jobData,
      salary: Number(jobData.salary),
      requirements: jobData.requirements
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      await axiosInstance.post('/jobs', payload);
      toast.success('Job posted successfully');
      setJobData({
        title: '',
        company: '',
        location: '',
        salary: '',
        description: '',
        requirements: '',
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error('Failed to post job');
    } finally {
      setIsSubmitting(false);
    }
  };



  const handleDelete = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axiosInstance.delete(`/jobs/${jobId}`);
        toast.success("Job deleted successfully");
        // Invalidate the postedJobs query to refresh the list
        queryClient.invalidateQueries(['postedJobs', userData?._id]);
      } catch (error) {
        console.error("Error deleting job:", error);
        toast.error("Failed to delete job");
      }
    }
  };
  
 

  return (
    <>
{(isOwnProfile || postedJobs?.length >0) && (
<div className="my-4 p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">HR Profile</h2>

      {/* Posted Jobs Section */}
      <div className="mb-8">
        <h3 className="text-sm font-bold mb-4"> { postedJobs?.length >0 ? "Posted Jobs" : "Become HR by posting jobs. ( by posting jobs every one can see you'r HR profile )"}</h3>
        {postedJobsLoading ? (
          <p>Loading jobs...</p>
        ) : postedJobsError ? (
          <p>Error: {postedJobsErrorMsg.message}</p>
        ) : postedJobs && postedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {postedJobs.map((job) => (
              
                <div className="bg-gray-100 p-4 rounded border">
                  <h4 className="font-bold">{job.title}</h4>
                  <p>{job.company}</p>
                  <p className="text-sm text-gray-600">{job.location}</p>
                  <Link to={`/jobs/posting/${job._id}${messageApplicants}`} className="no-underline" key={job._id}>
                  <p className='text-sm text-blue-600 underline' >see details</p>
                  </Link>
                  {isOwnProfile && (
  <button
  onClick={() => handleDelete(job._id)}
  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded mt-2"
>
  Delete
</button>
                  )}
                
                </div>
              
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No jobs posted yet.</p>
        )}
      </div>

      {/* Post Job Form Toggle */}
      {isOwnProfile && (
        <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {showForm ? 'Cancel' : 'Post a Job'}
      </button>
      )}
      

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Company</label>
            <input
              type="text"
              name="company"
              value={jobData.company}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={jobData.location}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Salary</label>
            <input
              type="number"
              name="salary"
              value={jobData.salary}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={jobData.description}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded w-full"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium">Requirements (comma separated)</label>
            <input
              type="text"
              name="requirements"
              value={jobData.requirements}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {isSubmitting ? 'Posting...' : 'Post Job'}
          </button>
        </form>
      )}
    </div>

)}

    </>
    
  );
};

export default JobProfile;