import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserById, getPostsByUser } from "../store";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const profileInfo = useSelector((state) => state.profileInfo);
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPostsByUser(id));
    dispatch(getUserById(id));
  }, [dispatch, id]);

  return (
    <div className="bg-purple-100 min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col justify-center items-center">
            <img
              className="w-40 h-40 md:w-48 md:h-48 rounded-full mb-4"
              src={`http://localhost:8000/${profileInfo.image}`}
              alt={profileInfo.fullName}
            />
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {profileInfo.fullName}
              </h1>
              <p className="text-lg font-medium text-gray-500 mb-4">
                {profileInfo.email}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-left mb-4">My Posts</h2>
            {posts.map((post) => (
              <div
                key={post._id}
                className="flex items-start gap-4  bg-gray-100 hover:bg-yellow-100 rounded-sm p-4 cursor-pointer transition-shadow hover:shadow-lg"
                onClick={() => navigate(`/blog/${post._id}`)}
              >
                <img
                  className="w-32 h-32 rounded-sm object-cover"
                  src={`http://localhost:8000/${post.image}`}
                  alt="post"
                />
                <div className="flex flex-col justify-center">
                  {post.categories?.map((tag) => (
                    <p
                      key={tag._id}
                      className="uppercase text-xs font-bold text-purple-600"
                    >
                      {tag.tag}
                    </p>
                  ))}
                  <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                  <p className="text-sm">{post?.introduction}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
