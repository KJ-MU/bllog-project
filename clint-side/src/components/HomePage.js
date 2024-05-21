import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../store";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  console.log("🚀 ~ HomePage ~ users:", users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div>
      {" "}
      <Header />
      <h2 className="text-2xl text-center my-20 pb-5 font-bold mb-4">
        List of Authors
      </h2>
      <div className="cursor-pointer flex flex-wrap justify-center items-center gap-10">
        {users?.map((user) => (
          <Link to={`profile/${user._id}`}>
            <div className="max-w-72 min-w-72 py-5 h-auto rounded-sm overflow-hidden shadow-lg bg-gray-100 transition-colors duration-300 hover:bg-yellow-100">
              <div className="flex items-center justify-center bg-white rounded-full h-24 w-24 mx-auto mt-4 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={`http://localhost:8000/${user.image}`}
                  alt={user.fullName}
                />
              </div>
              <div className="px-6 py-4 text-black">
                <div className="font-bold text-xl text-center mb-2">
                  {user.fullName}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
