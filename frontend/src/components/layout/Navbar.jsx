import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { Link } from "react-router-dom";
import { Bell, Home, LogOut, User, Users, MessageSquare,Handshake } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import socket from "../../utils/socket.io";
import { ToastContainer, toast } from 'react-toastify';

const Navbar = () => {
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
	const queryClient = useQueryClient();
    const location = useLocation();
    const [unreadMessages, setUnreadMessages] = useState(0);
	  useEffect(() => {
			if (authUser._id) {

				console.log("socket connected")
				// Listen for connect event and emit senderId.
				socket.on("connect", () => {
					socket.emit("register", authUser._id);
				});
				if (socket.connected) {
					socket.emit("register", authUser._id);
				}
			}
			return () => {
				socket.off("connect");
			};
		}, [authUser]);

		useEffect(() => {
			// Reset unread count when navigating to messages
			if (location.pathname.includes('/messages')) {
				setUnreadMessages(0);
			}
			
			// Create a named handler function for easier cleanup
			const handleMessage = (data) => {
				console.log("New message received via notification:", data);
				
				// Only show notification and increment counter if user isn't in messages route
				// Or if user is on the general messages page (not a specific conversation)
				if (!location.pathname.includes('/messages') || 
					location.pathname === '/messages/all') {
					notify(data.message);
					// Use functional update to avoid stale closure issues
					setUnreadMessages(prevCount => prevCount + 1);
				}
			};
			
			// Register the message handler
			socket.on("message", handleMessage);
			
			// Clean up event listener when component unmounts
			return () => {
				socket.off("message", handleMessage);
			};
		}, [location.pathname]); // Don't include unreadMessages in dependencies
		  
		  // Pass the actual message content to the toast
		  const notify = (messageText) => {
			const words = messageText.split(' ');
			const limitedText = words.slice(0, 5).join(' ') + (words.length > 5 ? '...' : '');
			toast(`New message: ${limitedText}`);
		  };

	const { data: notifications } = useQuery({
		queryKey: ["notifications"],
		queryFn: async () => axiosInstance.get("/notifications"),
		enabled: !!authUser,
	});

	const { data: connectionRequests } = useQuery({
		queryKey: ["connectionRequests"],
		queryFn: async () => axiosInstance.get("/connections/requests"),
		enabled: !!authUser,
	});

	const { mutate: logout } = useMutation({
		mutationFn: () => axiosInstance.post("/auth/logout"),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
	});
	const MyComponent = () => {
		console.log("Current route:", location.pathname);
	};

	const unreadNotificationCount = notifications?.data.filter((notif) => !notif.read).length;
	const unreadConnectionRequestsCount = connectionRequests?.data?.length;

	return (
		<nav className='bg-gray-100 secondary shadow-md sticky top-0 z-10'>
			<div className='max-w-7xl mx-auto px-4'>
				<div className='flex justify-between items-center py-3'>
					<div className='flex items-center space-x-4'>
						<Link to='/'>
							<img className='h-10 m-1 w-500 rounded' src='/linkup.png' alt='LinkedIn' />
						</Link>
					</div>
					<div className='flex items-center gap-2 md:gap-6'>
						{authUser ? (
							<>
								<Link to={"/"} className='text-neutral flex flex-col items-center'>
									<Home size={20} />
									<span className='text-xs hidden md:block'>Home</span>
								</Link>
								<Link to='/network' className='text-neutral flex flex-col items-center relative'>
									<Users size={20} />
									<span className='text-xs hidden md:block'>My Network</span>
									{unreadConnectionRequestsCount > 0 && (
										<span
											className='absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs 
										rounded-full size-3 md:size-4 flex items-center justify-center'
										>
											{unreadConnectionRequestsCount}
										</span>
									)}
								</Link>


								<Link to='/jobs' className='text-neutral flex flex-col items-center relative'>
								<Handshake size={20} />
									<span className='text-xs hidden md:block'>Jobs</span>
					
								</Link>

								<Link to='/notifications' className='text-neutral flex flex-col items-center relative'>
									<Bell size={20} />
									<span className='text-xs hidden md:block'>Notifications</span>
									{unreadNotificationCount > 0 && (
										<span
											className='absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs 
										rounded-full size-3 md:size-4 flex items-center justify-center'
										>
											{unreadNotificationCount}
										</span>
									)}
								</Link>

								


								<Link to='/messages/all' className='text-neutral flex flex-col items-center relative'>
								<MessageSquare size={20} />
									<span className='text-xs hidden md:block'>Messages</span>
									{unreadMessages > 0 && (
										<span
											className='absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs 
										rounded-full size-3 md:size-4 flex items-center justify-center'
										>
											{unreadMessages}
										</span>
									)}
								</Link>
								<Link
									to={`/profile/${authUser.username}`}
									className='text-neutral flex flex-col items-center'
								>
									<User size={20} />
									<span className='text-xs hidden md:block'>Me</span>
								</Link>
								<button
									className='flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800'
									onClick={() => logout()}
								>
									<LogOut size={20} />
									<span className='hidden md:inline'>Logout</span>
								</button>
							</>
						) : (
							<>
								<Link to='/login' className='btn btn-ghost'>
									Sign In
								</Link>
								<Link to='/signup' className='btn btn-primary'>
									Join now
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
			<ToastContainer />
		</nav>
	);
};
export default Navbar;

