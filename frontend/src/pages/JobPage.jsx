import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import { Link } from 'react-router-dom';
import { Loader } from 'lucide-react';

const JobPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [inputValue, setInputValue] = useState('');

  const { data: jobs, isLoading, isError, error } = useQuery({
    queryKey: ['jobs', searchQuery],
    queryFn: async () => {
      let url;
      if (searchQuery.trim() === '') {
        url = '/jobs';
      } else {
        // Endpoint to search based on requirements skills
        url = `/jobs/search?requirements=${encodeURIComponent(searchQuery)}`;
      }
      const response = await axiosInstance.get(url);
      return response.data;
    },
    keepPreviousData: true,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size={32} className="animate-spin text-blue-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        Latest Job Listings
      </h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8 flex">
        <input
          type="text"
          placeholder="Search by skills (e.g., React,Node.js)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-r-md hover:bg-blue-600 transition-colors duration-300"
        >
          Search
        </button>
      </form>

      {jobs.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          No job postings available currently.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
            >
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {job.title}
                </h2>
                <p className="text-base text-gray-600 mb-1">{job.company}</p>
                <p className="text-sm text-gray-600 mb-2">{job.location}</p>
                <p className="text-sm text-gray-700 mb-4">
                  {job.description.length > 100
                    ? job.description.substring(0, 100) + '...'
                    : job.description}
                </p>
              </div>
              <div>
                <Link
                  to={`/jobs/posting/${job._id}`}
                  className="inline-block bg-blue-500 text-white font-medium px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobPage;