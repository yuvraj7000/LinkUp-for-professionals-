import { useEffect, useState, useRef } from "react";
// import io from "socket.io-client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import socket from "../utils/socket.io"; 
// const socket = io("http://localhost:5001");

const MessageBox = ({ reciver , unreadMessages }) => {
    const { data: user } = useQuery({ queryKey: ["authUser"] });
    console.log("user : ", user);
    const [senderId, setSenderId] = useState(user?._id);
    const [reciverId, setReciverId] = useState(reciver);
    const [message, setMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    const messagesEndRef = useRef(null);

    console.log("reciverId : ", reciverId);
    console.log("senderId : ", senderId);
    
    const getConversationMessages = async (userOne, userTwo) => {
        try {
            const response = await axios.post(
                "http://localhost:5001/api/v1/users/conversationMessages",
                { userOne, userTwo },
                { withCredentials: true }
            );
            console.log("Conversation messages:", response.data);
            setChatMessages(response.data.messages);
        } catch (error) {
            console.error(
                "Error fetching conversation messages:",
                error.response ? error.response.data : error.message
            );
        }
    };

    useEffect(() => {
        if (senderId) {
            // Listen for connect event and emit senderId.
            socket.on("connect", () => {
                socket.emit("register", senderId);
            });
            if (socket.connected) {
                socket.emit("register", senderId);
            }
        }
        return () => {
            socket.off("connect");
        };
    }, [senderId, reciverId, reciver]);

    useEffect(() => {
        setReciverId(reciver);
        console.log("reciverId changed : ", reciverId);
        if(unreadMessages){
        unreadMessages((prevUnreadMessages) => ({
            ...prevUnreadMessages,
            [reciverId]: 0,
        }))
    };
    }, [reciver]);

    useEffect(() => {
        getConversationMessages(senderId, reciverId);
        // Listen for incoming chat messages
        socket.on("message", (data) => {
            console.log("Received message:", data);
            if (
                data.senderId === reciverId ){
               
                setChatMessages((prevMessages) => [...prevMessages, data]);
            }
            else if  (data.senderId === senderId && data.reciverId === reciverId) {
                setChatMessages((prevMessages) => [...prevMessages, data]);
            }
            else {
                unreadMessages((prevUnreadMessages) => ({
                    ...prevUnreadMessages,
                    [data.senderId]: (prevUnreadMessages[data.senderId] || 0) + 1,
                }));
            }
        });
        return () => {
            socket.off("message");
        };
    }, [user, reciverId]);

    const sendMessage = () => {
        if (message.trim()) {
            console.log("reciverId emit : ", reciverId);
            console.log("senderId emit : ", senderId);
            socket.emit("message", { message, senderId, reciverId });
            setMessage("");
        }
    };

    // Auto-scroll to bottom when chatMessages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages]);

    return (
        <div className="flex-1 p-4 flex flex-col">
            <h2 className="text-xl font-semibold text-center mb-4">Messages</h2>
            <div className="flex-1 border p-2 mb-2 bg-gray-50 rounded overflow-y-auto space-y-2">
                {chatMessages.map((msg, index) => (
                    <div
                        key={index}
                        className={`max-w-[100%] p-4 rounded-lg shadow-sm ${
                            msg.senderId === senderId
                                ? "self-end bg-green-200 text-right"
                                : "self-start bg-blue-200 text-left"
                        }`}
                    >
                        <p className="text-l text-gray-800 mb-1">{msg.message}</p>
                        {msg.timestamp && (
    <p className="text-xs text-gray-500">
        {new Date(msg.timestamp).toLocaleString(undefined, {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            month: "numeric",
            day: "numeric",
            year: "numeric",
        })}
        
    </p>
)}
                    </div>
                ))}
                {/* Dummy element to scroll into view */}
                <div ref={messagesEndRef} />
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    className="flex-1 p-2 border rounded"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default MessageBox;