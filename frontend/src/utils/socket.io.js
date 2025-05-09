import io from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND, {
  transports: ["websocket"], // force websocket transport
});

export default socket;