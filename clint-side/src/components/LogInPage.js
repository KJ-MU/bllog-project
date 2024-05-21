import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../store";
import { useNavigate } from "react-router-dom";
const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const loginAccount = { email, password };
    dispatch(logIn(loginAccount));
    navigate("/");
    // You can handle form submission here, like sending data to the server
  };

  return (
    <div className="  flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded  w-full sm:w-[500px]">
        <p className="font-bold text-xs my-4">LOG IN</p>
        <h2 className="text-[#232536] font-bold text-2xl mt-5 mb-20  ">
          Let’s Share Our Knowledge
        </h2>
        <form onSubmit={handleSubmit}>
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
          <div className="mb-6">
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
          <button
            type="submit"
            className="bg-yellow-400 font-bold text-[#232536] py-2 px-4 rounded-none hover:bg-yellow-500 transition-colors w-full"
          >
            Log In
          </button>
        </form>
        <Link to="/signup">
          <p className="my-5">I don't have account</p>
        </Link>
      </div>
    </div>
  );
};

export default LogInPage;
