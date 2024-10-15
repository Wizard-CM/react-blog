import React from "react";
import services from "../appwrite/database";
import { Link } from "react-router-dom";

const Postcard = ({ $id, title, featuredImage }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div>
        <div className="image w-full h-[381px]">
          <img src={services.getFilePreview(featuredImage)} className="w-full h-full object-cover" alt="" />
        </div>

        <h2 className="mt-6 mb-3 capitalize">{title}</h2>
      </div>
    </Link>
  );
};

export default Postcard;
