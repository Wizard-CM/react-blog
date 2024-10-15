import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Authlayout = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {

    if (authentication == true && authStatus == false) {
      // Authentication chahincha ,but user is not authenticated 
      navigate("/login");
    } else if (authentication == false && authStatus == true ) {
      // Authentication chaidaina ,but user is authenticated
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <Loader /> : <>{children}</>;
};

export default Authlayout;
