import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

const LogoutBtn = () => {
  const dispatch = useDispatch();

  // logout-Btn click --> server bata logout huncha , then only logout-reducer leh global state update garcha
  const logoutHandler = () => {
    authService
      .logout()
      .then(() => dispatch(logout()))
      .catch((error) => console.log(error));
  };

  return (
    <div className="relative group">
      <span className="text-lg font-semibold">
        <button
          className={`px-4 py-1 text-[1rem]  text-white rounded-full bg-gray-900`}
          onClick={logoutHandler}
        >
          Logout
        </button>
      </span>

      <span className="absolute left-0 bottom-[-8px] w-full h-[1px] bg-white transform scale-x-0 transition-transform duration-500 linear group-hover:scale-x-100"></span>
    </div>
  );
};

export default LogoutBtn;
