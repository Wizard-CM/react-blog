import React from "react";
import parse from "html-react-parser";
import appwriteService from "../../appwrite/database";
import { Link } from "react-router-dom";
import Like from "../../SVG/Like";
import { month } from "../../data";

const Blog_Item = ({ post, newdate }) => {
  return (
    <Link to={`/post/${post.$id}`}>
      <div className="flex items-center border-b-[1px] border-gray-300 py-1">
        <div className="left w-full">
          <div className="flex gap-3 font-mono">
            <p className="text-[0.7rem] capitalize">{post.userName}</p>
            <p className="text-[0.7rem]">
              {month[newdate?.getMonth()]} {newdate?.getDate()},
              {newdate?.getFullYear()}
            </p>
          </div>
          <h3 className="mt-1 font-semibold capitalize">{post?.title}</h3>
          <span className="font-[0.6rem] mb-2 text-[0.8rem] text-gray-700">
            {parse(post.content)}
          </span>
          <div className="flex items-center gap-4">
            <button className="my-2 px-2 bg-[#F0F0F0] border-[1px] text-[0.9rem] font-serif rounded-lg capitalize text-blue-600">
              {post.category}
            </button>
            <div className="flex items-center">
              <Like />
              <p className=" px-1  text-[0.7rem]  font-bold">{post?.likes}</p>
            </div>
          </div>
        </div>
        <div className="right">
          <img
            src={appwriteService.getFilePreview(post?.featuredImage)}
            className="w-44 h-28 shadow-sm object-cover"
            alt=""
          />
        </div>
      </div>
    </Link>
  );
};

export default Blog_Item;
