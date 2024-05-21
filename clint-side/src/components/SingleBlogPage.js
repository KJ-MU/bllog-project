import React, { useState } from "react";
import { FcLike } from "react-icons/fc";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPostById, getComments, addComment, addLike } from "../store";
import { useParams } from "react-router-dom";

const SingleBlogPage = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const postInfo = useSelector((state) => state.postById);
  const postComments = useSelector((state) => state.comments);
  const loading = useSelector((state) => state.loading);
  const formatCreatedAtToMonth = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  const token = localStorage.getItem("token");
  const handleAddLikes = () => {
    dispatch(addLike(postInfo._id, token));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    dispatch(addComment(postInfo._id, text, token));
    setText("");
  };
  useEffect(() => {
    dispatch(getPostById(id));
    dispatch(getComments(id));
  }, [dispatch]);
  return (
    <>
      {loading === false && (
        <div className="my-10">
          <div className="flex justify-start md:justify-center ">
            <div className=" flex flex-col items-start m-auto mx-4 md:mx-auto md:w-3/5">
              <div className="flex items-center ">
                <img
                  className="rounded-full w-16"
                  src={`http://localhost:8000/${postInfo.user?.image}`}
                  alt="user image"
                />
                <div className="text-left">
                  {" "}
                  <p className="text-base text-[#592EA9] font-bold">
                    {postInfo.user?.fullName}
                  </p>
                  <p className="text-xs text-[#6D6E76]">
                    posted on {formatCreatedAtToMonth(postInfo.createdAt)}
                  </p>
                </div>
              </div>
              <div className="mx-4  ">
                <h1 className="my-4 font-semibold text-4xl text-left">
                  {postInfo.title}
                </h1>
                <div className="flex gap-4 my-6 flex-wrap">
                  {postInfo.categories?.map(
                    (
                      tag,
                      index // Adding 'index' as the second argument
                    ) => (
                      <p
                        key={index} // Using 'index' as the key
                        className="flex justify-center items-center border rounded-3xl py-1 px-4 text-base text-[#6D6E76] border-[#6D6E76]"
                      >
                        {tag.tag}
                      </p>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <img
              className="md:w-11/12 w-full"
              src={`http://localhost:8000/${postInfo.image}`}
              alt=""
            />
          </div>
          <div className="my-10 mx-4 md:mx-auto flex flex-col gap-5 items-start m-auto md:w-3/5">
            <p>{postInfo.introduction}</p>
            <p>{postInfo.content}</p>
          </div>
          <div className="my-10 mx-2 md:mx-auto m-auto md:w-3/5 border">
            <div className="flex justify-between">
              <p className="text-left mx-4">{postComments?.length} comments</p>
              <div
                onClick={handleAddLikes}
                className="mx-4 flex items-center gap-1 itme text-gray-600 hover:cursor-pointer"
              >
                <p className="p-1"> {postInfo.likeCount}</p>
                <FcLike size={30} />
              </div>
            </div>
            {postComments?.map((comment) => (
              <div key={comment._id} className="p-4">
                <p className="text-[#592EA9] font-bold text-sm text-left mb-1">
                  {comment.user?.fullName}
                </p>
                <p className="bg-gray-200 rounded p-2 text-left break-words">
                  {comment.text}
                </p>
              </div>
            ))}
          </div>
          <div className="my-10 mx-2 md:mx-auto flex items-center justify-between m-auto md:w-3/5">
            <div className="flex-grow mr-4">
              <input
                type="text"
                placeholder="Add a comment"
                className="p-2 w-full border bg-[rgba(255,255,255,0)] border-gray-300 rounded-none"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </div>

            <button
              onClick={handleAddComment}
              className="bg-yellow-400 font-bold text-[#232536] py-2 px-4 rounded-none hover:bg-yellow-500 transition-colors"
            >
              comment
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleBlogPage;
