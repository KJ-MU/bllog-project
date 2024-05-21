import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../store";
import { useNavigate } from "react-router-dom";
const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null); // State for storing the selected image file

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", image);
    dispatch(signUp(formData));
    navigate("/login");
    // You can handle form submission here, like sending data to the server
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded w-full sm:w-[500px]">
        <p className="font-bold text-xs my-4">SIGN UP</p>
        <h2 className="text-[#232536] font-bold text-2xl mt-5 mb-20">
          Let’s Share Our Knowledge
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="fullName"
              placeholder="Full Name"
              className="mt-1 p-2 block w-full border bg-[rgba(255,255,255,0)] border-gray-300  rounded-none"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="mt-1 p-2 block w-full border bg-[rgba(255,255,255,0)] border-gray-300  rounded-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="mt-1 p-2 block w-full border bg-[rgba(255,255,255,0)] border-gray-300  rounded-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="file"
              id="image"
              className="mt-1 p-2 block w-full border bg-[rgba(255,255,255,0)] border-gray-300  rounded-none"
              onChange={handleImageChange}
              accept="image/*" // Accept only image files
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-400 font-bold text-[#232536] py-2 px-4 rounded-none hover:bg-yellow-500 transition-colors w-full"
          >
            Sign Up
          </button>
        </form>
        <Link to="/login">
          <p className="my-5">Already have an account</p>
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
