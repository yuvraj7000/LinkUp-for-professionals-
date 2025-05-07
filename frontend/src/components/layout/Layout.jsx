import Navbar from "./Navbar";
import { useQuery } from "@tanstack/react-query";

const Layout = ({ children, socket }) => {

	 const { data: user } = useQuery({ queryKey: ["authUser"] });

	return (
		<div className='min-h-screen bg-base-100'>
			{ user && <Navbar socket={socket}/> }
			{/* <Navbar socket={socket}/> */}
			<main className='max-w-7xl mx-auto px-4 py-6'>{children}</main>
		</div>
	);
};
export default Layout;