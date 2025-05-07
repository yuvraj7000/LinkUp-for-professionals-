import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import PostCreation from "../components/PostCreation";
import Post from "../components/Post";
import { Users, Search } from "lucide-react";
import RecommendedUser from "../components/RecommendedUser";
import { Link } from "react-router-dom";

const HomePage = () => {
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });

	const { data: recommendedUsers } = useQuery({
		queryKey: ["recommendedUsers"],
		queryFn: async () => {
			const res = await axiosInstance.get("/users/suggestions");
			return res.data;
		},
	});

	const { data: posts } = useQuery({
		queryKey: ["posts"],
		queryFn: async () => {
			const res = await axiosInstance.get("/posts");
			console.log("friends posts : ", res.data);
			return res.data;
		},
	});

	const { data: lposts } = useQuery({
		queryKey: ["lposts"],
		queryFn: async () => {
			const res = await axiosInstance.get("/posts/latest");
			console.log("latest posts --- : ", res.data);
			return res.data;
		},
	});

	

	// State for Search Query
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const [showLatestPosts, setShowLatestPosts] = useState(true);

	// Handle Search Input
	const handleSearch = async (e) => {
		e.preventDefault();
		if (!searchQuery.trim()) return;

		try {
			const res = await axiosInstance.get(`/users/search?query=${searchQuery}`);
			setSearchResults(res.data);
		} catch (error) {
			console.error("Error fetching search results:", error);
		}
	};
	console.log("auth user : ", authUser)

	return (
		<div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
			<div className='hidden lg:block lg:col-span-1'>
				<Sidebar user={authUser} />
			</div>

			<div className='col-span-1 lg:col-span-2 order-first lg:order-none'>
    <PostCreation user={authUser} />
    
    {/* Toggle buttons for post type */}
    <div className="flex mb-4 bg-white rounded-lg shadow p-2">
	<button 
            onClick={() => setShowLatestPosts(true)}
            className={`flex-1 py-2 px-4 rounded-md transition ${showLatestPosts 
                ? "bg-blue-500 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
        >
            Latest Posts
        </button>
        <button 
            onClick={() => setShowLatestPosts(false)}
            className={`flex-1 py-2 px-4 rounded-md transition ${!showLatestPosts 
                ? "bg-blue-500 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
        >
            Friends Posts
        </button>
    </div>
    
    {/* Show either latest posts or friends posts based on toggle */}
    {(showLatestPosts ? lposts : posts)?.map((post) => (
        <Post key={post._id} post={post} />
    ))}

    {/* Show empty state if no posts */}
    {(showLatestPosts ? lposts?.length === 0 : posts?.length === 0) && (
        <div className='bg-white rounded-lg shadow p-8 text-center'>
            <div className='mb-6'>
                <Users size={64} className='mx-auto text-blue-500' />
            </div>
            <h2 className='text-2xl font-bold mb-4 text-gray-800'>No Posts Yet</h2>
            <p className='text-gray-600 mb-6'>
                {showLatestPosts 
                    ? "There are no posts yet. Be the first to create one!" 
                    : "Connect with others to start seeing posts in your feed!"}
            </p>
        </div>
    )}
</div>

			<div className='col-span-1 lg:col-span-1 hidden lg:block'>
				{/* Search User Functionality */}
				<div className='bg-white rounded-lg shadow p-4 mb-4'>
					<h2 className='font-semibold mb-4'>Search Users</h2>
					<form onSubmit={handleSearch} className='flex items-center border rounded-lg px-3 py-2'>
						<Search className='text-gray-500 mr-2' />
						<input
							type='text'
							placeholder='Search for users...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className='w-full outline-none bg-transparent'
						/>
						<button type='submit' className='ml-2 text-blue-500 font-semibold'>Search</button>
					</form>
				</div>

				{/* Display Search Results */}
				{searchResults.length > 0 && (
					<div className='bg-white rounded-lg shadow p-4'>
						<h2 className='font-semibold mb-4'>Search Results</h2>
						{searchResults.map((user) => (
							<RecommendedUser key={user._id} user={user} />
						))}
					</div>
				)}


		{/* Jobs Section */}
                <div className='bg-white rounded-lg shadow p-4 mb-4'>
                    <h2 className='font-semibold text-lg mb-2'>Looking for Job Opportunities?</h2>
                    <p className='text-gray-400 text-sm mb-4'>
                        Explore new job listings and opportunities to kickstart your career. 
                        Find the perfect role that matches your skills and interests.
                    </p>
                    <Link 
                        to="/jobs" 
                        className='block text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-300'
                    >
                        Find Jobs
                    </Link>
                </div>		

		
				{/* Recommended Users Section */}
				{recommendedUsers?.length > 0 && (
					<div className='bg-white rounded-lg shadow p-4'>
						<h2 className='font-semibold mb-4'>People You May Know</h2>
						{recommendedUsers.map((user) => (
							<RecommendedUser key={user._id} user={user} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default HomePage;
