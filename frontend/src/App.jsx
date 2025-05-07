import React from 'react';
import Layout from './components/layout/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import NotificationsPage from './pages/NotificationsPage';
import NetworkPage from './pages/NetworkPage';
import PostPage from './pages/PostPage';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';
import JobPage from './pages/JobPage';
import JobDetails from './pages/JobDetails';
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios"; 
import Home from './open_pages/Home';
import About from './open_pages/About';
import Features from './open_pages/Features';
import Contact from './open_pages/Contact';
import Navbar_Open from './open_pages/Navbar_open';
import Footer_open from './open_pages/Footer_open';




function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 401) {
          return null;
        }
        toast.error(err.response.data.message || "Something went wrong");
      }
    },
  });
  if (isLoading) return null;
  return (
    <>
    {!authUser && <Navbar_Open />}
    <Layout>
      {/* {!authUser && <Navbar_Open />} */}
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path='/notifications' element={authUser ? <NotificationsPage /> : <Navigate to={"/login"} />} />
        <Route path='/network' element={authUser ? <NetworkPage /> : <Navigate to={"/login"} />} />
        <Route path='/jobs' element={authUser ? <JobPage /> : <Navigate to={"/login"} />} />
        <Route path='/jobs/posting/:id' element={authUser ? <JobDetails /> : <Navigate to={"/login"} />} />
        <Route path='/messages/:reciver' element={authUser ? <MessagesPage /> : <Navigate to={"/login"} />} />
        <Route path='/post/:postId' element={authUser ? <PostPage /> : <Navigate to={"/login"} />} />
				<Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />} /> 
      </Routes>
      {/* {!authUser && <Footer_open />} */}
      <Toaster />
    </Layout>
    {!authUser && <Footer_open />}
    </>
  );
}

export default App;
