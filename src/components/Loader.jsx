import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-16 h-16 border-[8px] border-white border-dotted rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
