import { Link, Navigate } from "react-router-dom";
import axios from "axios";

function UserCard({ user, isConnection, current_User }) {
	console.log("user con : ",user._id);
	console.log("current user : ",current_User._id);



	return (
		<div className='bg-gray-100 rounded-lg shadow p-4 flex flex-col items-center transition-all hover:shadow-md'>
			<Link to={`/profile/${user.username}`} className='flex flex-col items-center'>
				<img
					src={user.profilePicture || "/avatar.png"}
					alt={user.name}
					className='w-24 h-24 rounded-full object-cover mb-4'
				/>
				<h3 className='font-semibold text-lg text-center'>{user.name}</h3>
			</Link>
			<p className='text-gray-600 text-center'>{user.headline}</p>
			<p className='text-sm text-gray-500 mt-2'>{user.connections?.length} connections</p>
			<button className='mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors w-full'>
				{isConnection ? "Connected" : "Connect"}
			</button>
			<Link to={`/messages/${user.username}`}>
			<div className='mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors w-full' >
				message
			</div>
			</Link>
		</div>
	);
}

export default UserCard;
