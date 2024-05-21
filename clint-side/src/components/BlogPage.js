import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, getCategories, getPostsByCategoryId } from "../store";
import { useNavigate } from "react-router-dom";

const BlogPage = () => {
  const categories = useSelector((state) => state.categories);
  const posts = useSelector((state) => state.posts);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentCategory, setCurrentCategory] = useState(null);

  const handleAllPosts = () => {
    setCurrentCategory(null);
    dispatch(getPosts());
  };

  const handlePostsByCategory = (categoryId) => {
    setCurrentCategory(categoryId);
    dispatch(getPostsByCategoryId(categoryId));
  };

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getCategories());
  }, []);

  return (
    <>
      {loading === false && (
        <div className="container mx-auto flex justify-between px-4 py-8">
          <div className="w-2/3">
            <h2 className="text-2xl text-left font-bold mb-4">All Posts</h2>
            {posts.map((post) => (
              <div
                key={post._id}
                className="flex items-start justify-start gap-4 bg-gray-100 rounded p-4 mb-4 cursor-pointer"
                onClick={() => navigate(`/blog/${post._id}`)}
              >
                <img
                  className="w-32 h-32"
                  src={`http://localhost:8000/${post.image}`}
                  alt="post"
                />
                <div className="flex flex-col items-start gap-2">
                  {post.categories?.map((tag) => (
                    <p
                      key={tag._id}
                      className="uppercase text-xs font-bold text-[#592EA9]"
                    >
                      {tag.tag}
                    </p>
                  ))}

                  <h3 className="text-2xl font-semibold">{post.title}</h3>
                  <p className="text-xs">{post?.introduction}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="w-1/3 ml-8">
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
            <ul className="flex flex-wrap gap-2 justify-center items-center">
              <li
                onClick={handleAllPosts}
                className={`hover:bg-[#ffd05097] hover:text-slate-900 mb-2 flex justify-center items-center border rounded-3xl py-1 px-4 text-base text-[#6D6E76] border-[#6D6E76] ${
                  currentCategory === null && "bg-[#ffd05097] text-slate-900"
                }`}
              >
                All
              </li>
              {categories.map((category) => (
                <li
                  key={category._id}
                  onClick={() => handlePostsByCategory(category._id)}
                  className={`hover:bg-[#ffd05097] hover:text-slate-900 mb-2 flex justify-center items-center border rounded-3xl py-1 px-4 text-base text-[#6D6E76] border-[#6D6E76] ${
                    currentCategory === category._id &&
                    "bg-yellow-400 text-slate-900"
                  }`}
                >
                  {category.tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogPage;
