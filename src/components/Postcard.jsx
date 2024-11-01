import React from "react";
import services from "../appwrite/database";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Postcard = ({
  $id,
  title,
  featuredImage,
  category,
  content,
  userName,
  $createdAt,
  newdate
}) => {
  return (
    <Link to={`/post/${$id}`} className="w-full inline-block">
      <div className=" bg-white rounded-lg shadow-lg  transition-transform duration-300 hover:scale-105 h-80 w-full">
        <div className="image w-full h-48">
          <img
            src={services.getFilePreview(featuredImage)}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div className="content px-3 mt-4 overflow-hidden">
          <p className="text-sm text-blue-500 font-semibold capitalize">
            {category}
          </p>
          <div className="flex gap-1">
            <p className="text-[0.9rem]">{userName}</p>-
            <p className="text-[0.9rem]">
              {month[newdate?.getMonth()]} {newdate?.getDate()},
              {newdate?.getFullYear()}
            </p>
          </div>
          <h4 className=" font-bold text-gray-800 uppercase mb-1">{title}</h4>
        </div>
      </div>
    </Link>
  );
};

export default Postcard;
