import React from "react";
import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { gsap } from "gsap";
import decodeJWT from "../utils/jwt";
const Navbar = () => {
  const loggedInUser = useSelector((state) => state.loggedInUser.trim());

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const token = localStorage.getItem("token");
  const loginperson = decodeJWT(token);
  console.log("🚀 ~ loginperson:", loginperson);
  const setMenuRef = useCallback((node) => {
    if (node) {
      menuRef.current = node;
    }
  }, []);

  const toggleNav = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      gsap.to(menuRef.current, {
        duration: 0.5,
        height: "270px",
        opacity: 1,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(menuRef.current, {
        duration: 0.5,
        height: "0px",
        opacity: 0,
        ease: "power2.inOut",
      });
    }
  };
  return (
    <nav className="bg-[#232536] text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center px-2">
            <span className="text-lg font-bold">
              <p>{`{ Mind Hub`}</p>{" "}
            </span>
          </div>
        </Link>
        {/* Navigation links */}
        <ul className="md:flex items-center px-2 gap-10 shrink hidden ">
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
          {loginperson ? (
            <li>
              <Link
                to={`/profile/${loginperson.userId}`}
                className="hover:text-gray-300 font-normal"
              >
                Profile
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/signup" className="hover:text-gray-300 font-normal">
                Sign Up
              </Link>
            </li>
          )}

          <li>
            <button className="text-[#232536] font-bold hover:bg-gray-300 bg-white px-4 py-2 ">
              Subscribe
            </button>
          </li>
          <li>
            <BsThreeDotsVertical />
          </li>
        </ul>
        <FaBars
          className="h-6 w-6 mx-2 text-white cursor-pointer md:hidden"
          onClick={toggleNav}
        />
      </div>
      {isOpen && (
        <ul
          ref={setMenuRef}
          className={`flex flex-col items-center h-auto gap-10 md:hidden p-4 transition-all duration-500 ${
            isOpen && "open"
          }`}
          style={{ overflow: "hidden" }}
        >
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
          {loginperson ? (
            <li>
              <Link
                to={`/profile/${loginperson.userId}`}
                className="hover:text-gray-300 font-normal"
              >
                Profile
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/signup" className="hover:text-gray-300 font-normal">
                Sign Up
              </Link>
            </li>
          )}
          <li>
            <button className="text-[#232536] font-bold hover:bg-gray-300 bg-white px-4 py-2 ">
              Subscribe
            </button>
          </li>
          <li>
            <BsThreeDotsVertical />
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
