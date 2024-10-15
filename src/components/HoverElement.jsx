import React from "react";
import { Link, NavLink } from "react-router-dom";

const UnderlineOnHover = ({ navItem }) => {
  return (
    <div className="relative group">
      <span className="text-lg font-semibold">
        <NavLink className={({isActive}) => `font-light text-[18px] transition-all duration-300  ${isActive && "text-gray-400"}`} to={navItem.slug}>
          {navItem.name}
        </NavLink>
      </span>

      <span className="absolute left-0 bottom-[-8px] w-full h-[1px] bg-white transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
    </div>
  );
};

export default UnderlineOnHover;
