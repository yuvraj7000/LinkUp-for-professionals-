import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import MessageBox from "../components/MessageBox";
import { useParams } from "react-router-dom";

const MessagesPage = () => {
    const { data: user } = useQuery({ queryKey: ["authUser"] });
    // console.log("user : ", user);
    const { reciver } = useParams();
    // If the reciver param is "all", treat it as not provided.
    const routeReciver = reciver === "all" ? null : reciver;

    const [sendTo, setSendTo] = useState(null);
    const [reciverId, setReciverId] = useState(null);
    const [messageUsers, setMessageUsers] = useState([]);
    const [unreadMessages, setUnreadMessages] = useState({});

    console.log("Route reciver:", routeReciver);

    useEffect(() => {
        if (routeReciver) {
            // If routeReciver is provided, fetch that user’s public profile.
            const fetchPublicProfile = async () => {
                try {
                    const response = await axios.get(`http://localhost:5001/api/v1/users/${routeReciver}`, { withCredentials: true });
                    console.log("Public profile data:", response.data);
                    setSendTo(response.data);
                } catch (error) {
                    console.error(
                        "Error fetching public profile:",
                        error.response ? error.response.data : error.message
                    );
                }
            };
            fetchPublicProfile();
        } else if (user?._id) {
            // If no reciver param, fetch the message users for the logged in user.
            const fetchMessageUsers = async () => {
                try {
                    const response = await axios.get(`http://localhost:5001/api/v1/users/userMessages/${user._id}`, { withCredentials: true });
                    console.log("Fetched message users:", response.data);
                    if (response.data.users) {
                        setMessageUsers(response.data.users);
                        setReciverId(response.data.users[0]?._id); 
                        console.log("Reciver ID:", reciverId);
                        console.log("First message user ID:", response.data.users[0]?._id);
                    }
                } catch (error) {
                    console.error(
                        "Error fetching messages:",
                        error.response ? error.response.data : error.message
                    );
                }
            };
            fetchMessageUsers();
        }
    }, [user, routeReciver]);

    useEffect(() => {
        console.log("Updated Reciver ID:", reciverId);
    }, [reciverId, unreadMessages]);

    useEffect(() => {
        if (reciverId) {
            setUnreadMessages((prevUnreadMessages) => ({
                ...prevUnreadMessages,
                [reciverId]: 0,
            }));
        }
    }, [reciverId]);

    // If a reciver parameter is provided, wait until we get the public profile data.
    if (routeReciver) {
        if (!sendTo) return null;
        return (
            <div className="flex h-[80vh] bg-gray-100">
                {/* Left Section: Displays the selected user */}
                <div className="w-1/3 border-r p-4 overflow-y-auto flex flex-col items-center justify-center">
    <h2 className="text-xl font-semibold mb-4 flex items-center justify-center">Message to</h2>
    <div key={sendTo._id} className="flex flex-col items-center p-2 mb-2 bg-gray-100 rounded">
        <img
            src={sendTo.profilePicture || "/avatar.png"}
            alt={sendTo.name}
            className="w-20 h-20 rounded-full mr-2 object-cover"
        />
        <div>
            <h3 className="font-semibold">{sendTo.name}</h3>
            <p className="text-sm text-gray-500">{sendTo.username}</p>
        </div>
    </div>
</div>
                {/* Right Section: Chat Room with the selected user */}
                <MessageBox reciver={sendTo._id} />
            </div>
        );
    }

    // When no reciver parameter is provided, display the list of message users.
    return (
        <div className="flex h-[80vh] bg-gray-100">
            {/* Left Section: List of message users */}
            <div className="w-1/3 border-r p-4 overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Users</h2>
                {messageUsers.map((msgUser) =>{
                    // if (reciverId === msgUser._id ){
                    //     setUnreadMessages((prevUnreadMessages) => ({
                    //         ...prevUnreadMessages,
                    //         [reciverId]: 0,
                    //     }));
                    // } ; // Skip the logged-in user
                    return (
                    <div
                        key={msgUser._id}
                        onClick={() => setReciverId(msgUser._id)}
                        className={`flex items-center p-2 mb-2 bg-gray-100 rounded cursor-pointer border-2 border-grey-100 ${reciverId === msgUser._id ? "border-2 border-grey-500 bg-white" : ""
                            }`}
                    >
                        <img
                            src={msgUser.profilePicture || "/avatar.png"}
                            alt={msgUser.name}
                            className="w-12 h-12 rounded-full mr-2 object-cover"
                        />
                        <div>
                            <h3 className="font-semibold">{msgUser.name}</h3>
                            <p className="text-sm text-gray-500">{msgUser.username}</p>
                        </div>
                        <div className="ml-auto">
                            {unreadMessages[msgUser._id] > 0 &&  (
                                <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                    {unreadMessages[msgUser._id]}
                                </span>
                            )}
                            </div>
                    </div>
                )})}
            </div>
            {/* Right Section: Chat Room */}
            <MessageBox reciver={reciverId} unreadMessages={setUnreadMessages} />
        </div>
    );
};

export default MessagesPage;