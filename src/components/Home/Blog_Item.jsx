import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import appwriteService from "../../appwrite/database";
import { Link } from "react-router-dom";
import Like from "../../SVG/Like";
import { month } from "../../data";
import { Blurhash } from "react-blurhash";

const Blog_Item = ({ post, newdate }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const [opacity, setOpacity] = useState("opacity-[0]");
  const src = appwriteService.getFilePreview(post?.featuredImage);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
      setOpacity("opacity-[1]");
    };

    img.src = src;
  }, []);

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
          <div className="relative w-44 h-28">
            <img
              src={src}
              className={`absolute top-0 left-0 ${
                imageLoaded && "z-[11]"
              } w-full h-full shadow-sm object-cover transition-all duration-1000 ease-in-out ${opacity}`}
              style={{ opacity: {} }}
              alt=""
              loading="lazy"
            />
            <Blurhash
              hash={post?.blurHash}
              width={"100%"}
              height={"100%"}
              resolutionX={32}
              resolutionY={32}
              punch={1}
              className={`absolute top-0 left-0 z-10`}
            />
            {/* <div className="w-full h-full absolute top-0 left-0 z-10 bg-[rgba(255, 255, 255,0.1)] backdrop-blur-md"></div> */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Blog_Item;
