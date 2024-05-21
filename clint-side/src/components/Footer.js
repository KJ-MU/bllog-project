import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiEdit, FiLogIn } from "react-icons/fi"; // Assuming you have imported the necessary icons
import {
  AiOutlineInstagram,
  AiFillLinkedin,
  AiFillFacebook,
} from "react-icons/ai"; // Assuming you have imported the necessary icons

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log("Subscribed!");
  };

  return (
    <footer className="bg-[#232536] text-white py-4 mt-10 lg:px-20">
      <div className="container flex flex-col items-center mx-auto">
        <div className="flex flex-col w-full items-center">
          <div className="flex w-full justify-between">
            <Link to="/">
              <div className="h-20 flex items-center px-4">
                <span className="text-lg font-bold">
                  <p>{`{ Mind Hub`}</p>{" "}
                </span>
              </div>
            </Link>
            {/* Navigation links */}
            <ul className="flex items-center px-2 gap-10 shrink  ">
              <li>
                <Link to="/" className="hover:text-gray-300 font-normal">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-gray-300 font-normal">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-gray-300 font-normal">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          <div className="bg-[rgba(255,255,255,0.05)] w-full flex flex-col lg:flex-row gap-20 p-10 py-28">
            <span className="font-bold text-2xl  flex   justify-center items-center lg:w-1/2 text-left lg:ml-10 ">
              Subscribe to our newsletter to get the latest updates and news
            </span>
            <div className="flex justify-center lg:justify-end lg:w-1/2 lg:mr-10">
              <form
                onSubmit={handleSubscribe}
                className="flex items-center space-x-2"
              >
                <input
                  type="email"
                  placeholder="Your Email"
                  className=" p-2 block  border bg-[rgba(255,255,255,0)] border-gray-300 w-64  rounded-none"
                />
                <button
                  type="submit"
                  className="bg-yellow-400 text-[#232536] font-bold py-2 px-4 rounded-none hover:bg-yellow-500 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full justify-between h-20 px-4">
          <span className="text-sm">123 Fake Street, City, Country</span>
          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiOutlineInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillLinkedin />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillFacebook />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
