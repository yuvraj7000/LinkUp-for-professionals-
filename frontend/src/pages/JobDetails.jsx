import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import { Loader } from 'lucide-react';
import { toast } from 'react-toastify';

const JobDetails = () => {
  const { id } = useParams();
  // Check for "self" in the id and set heiring accordingly.
  let jobId = id;
  let heiring = false;
  if (jobId.endsWith("self")) {
    heiring = true;
    jobId = jobId.replace("self", "");
  }

  const queryClient = useQueryClient();

  const { data: job, isLoading, isError, error } = useQuery({
    queryKey: ['job', jobId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/jobs/${jobId}`);
      return data;
    },
  });

  const { mutate: applyJob, isLoading: applyingJob } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.post(`/jobs/${jobId}/apply`);
      return data;
    },
    onSuccess: () => {
      toast.success("Your profile is shared with recruiter");
      queryClient.invalidateQueries({ queryKey: ['job', jobId] });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to apply for job");
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Loader size={40} className="animate-spin text-blue-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl text-red-600">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-xl mt-4">
      {/* Job Header */}
      <header className="mb-8 border-b pb-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{job.title}</h1>
        <div className="mb-2">
          <p className="text-xl font-medium text-gray-700">{job.company}</p>
          <p className="text-md text-gray-600">
            {job.location} &middot; <span className="font-semibold">Salary:</span> ${job.salary}
          </p>
          <p className="text-sm text-gray-500">
            Posted on: {new Date(job.createdAt).toLocaleDateString()}
          </p>
        </div>
      </header>

      {/* Job Description */}
      <section className="mb-8 border-b pb-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Job Description</h2>
        <p className="text-gray-700 leading-relaxed">{job.description}</p>
      </section>

      {/* Requirements */}
      {job.requirements && job.requirements.length > 0 && (
        <section className="mb-8 border-b pb-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Requirements</h2>
          <ul className="list-disc pl-6 space-y-2">
            {job.requirements.map((req, index) => (
              <li key={index} className="text-gray-700">{req}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Posted By */}
      {job.postedBy && (
        <section className="mb-8 border-b pb-4">
          <Link to={`/profile/${job.postedBy.username}`}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Posted By</h2>
            <div className="flex items-center">
              <img
                src={job.postedBy.profilePicture || '/avatar.png'}
                alt={job.postedBy.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="text-lg font-medium text-gray-700">{job.postedBy.name}</p>
                <p className="text-sm text-gray-600">@{job.postedBy.username}</p>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Applicants Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Applicants</h2>
        {job.applicants && job.applicants.length > 0 ? (
          <div className="space-y-4">
            {job.applicants.map((applicant) => (
              <div key={applicant._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm">
                <Link to={`/profile/${applicant.username}`} className="flex items-center space-x-3">
                  <img
                    src={applicant.profilePicture || '/avatar.png'}
                    alt={applicant.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-lg font-medium text-gray-700">{applicant.name}</p>
                    <p className="text-sm text-gray-600">@{applicant.username}</p>
                  </div>
                </Link>
                {heiring && (
                  <Link to={`/messages/${applicant.name}`}>
                    <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-300">
                      Message
                    </button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No applicants yet.</p>
        )}
      </section>

      {/* Apply Button */}
      <div>
        <button
          onClick={() => applyJob()}
          disabled={applyingJob}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
        >
          {applyingJob ? "Applying..." : "Apply for Job"}
        </button>
      </div>
    </div>
  );
};

export default JobDetails;