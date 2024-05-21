import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getHeaderPost, getFeaturedPost, getPosts } from "../store";
// import { getPostById } from "../store";
const Header = () => {
  const navigate = useNavigate();
  const posts = useSelector((state) => state.posts);
  const post = useSelector((state) => state.headerPost);
  const featuredPost = useSelector((state) => state.featuredPost);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  useEffect(() => {
    dispatch(getHeaderPost());
    dispatch(getFeaturedPost());
    dispatch(getPosts());
  }, []);

  // Function to format date to month name
  const formatCreatedAtToMonth = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      {loading === false && (
        <div
          className="relative h-96 bg-cover bg-center flex md:justify-start justify-center items-center p-4 md:p-20"
          style={{
            backgroundImage: `url(http://localhost:8000/${post.image})`,
          }}
        >
          <div className="absolute inset-0 bg-[#2325364e] "></div>
          <div className="md:text-left text-center text-white z-10 flex flex-col md:items-start items-center gap-4">
            <h1 className="text-5xl mb-2 font-bold">{post.title}</h1>
            <p className="text-xs">
              By <span className="text-yellow-400">{post.user?.fullName}</span>{" "}
              | {formatCreatedAtToMonth(post.createdAt)}
            </p>
            <p className="text-xs">{post.introduction}</p>
            <Link to={`blog/${post._id}`}>
              <button className="flex justify-center items-center text-sm bg-yellow-400 font-thin text-[#232536] py-3 px-5 w-32 rounded-none hover:bg-yellow-500 transition-colors">
                {` Read More>`}
              </button>
            </Link>
          </div>
        </div>
      )}
      <div className="md:px-20 my-10 md:flex-row flex-col justify-around mx-2 flex">
        <div className=" md:w-2/5">
          <h2 className="text-2xl text-left font-bold mb-4">Featured Post</h2>
          <div
            key={featuredPost._id}
            className="flex flex-col items-start justify-start gap-4 border rounded-sm p-4 mb-4 cursor-pointer"
            onClick={() => navigate(`/blog/${featuredPost._id}`)}
          >
            <img
              className="w-full h-auto"
              src={`http://localhost:8000/${featuredPost.image}`}
              alt="post"
            />
            <div className="flex flex-col items-start gap-2">
              <p className="text-xs">
                By{" "}
                <span className="text-[#592EA9]">
                  {featuredPost.user?.fullName}
                </span>{" "}
                | {formatCreatedAtToMonth(featuredPost.createdAt)}
              </p>

              <h3 className="text-xl font-semibold">{featuredPost.title}</h3>
              <p className="text-xs">{featuredPost?.introduction}</p>
              <Link to={`blog/${featuredPost._id}`}>
                <button className="flex justify-center items-center text-sm bg-yellow-400 font-thin text-[#232536] py-2 px-4 w-28 rounded-none hover:bg-yellow-500 transition-colors">
                  {` Read More>`}
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className=" md:3/5">
          <div className="w-full">
            <h2 className="text-2xl text-left font-bold mb-4">All Posts</h2>
            {posts.map((post) => (
              <div
                key={post._id}
                className="md:min-w-96 flex items-start justify-start gap-4 hover:bg-[#ffd05097] bg-gray-100 rounded p-4 mb-4 cursor-pointer"
                onClick={() => navigate(`/blog/${post._id}`)}
              >
                <div className="flex flex-col items-start ">
                  <p className="text-xs">
                    By{" "}
                    <span className="text-[#592EA9]">
                      {featuredPost.user?.fullName}
                    </span>{" "}
                    | {formatCreatedAtToMonth(featuredPost.createdAt)}
                  </p>

                  <h3 className="text-2xl font-semibold">{post.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default Header;
