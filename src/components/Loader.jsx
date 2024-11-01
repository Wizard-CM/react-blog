import React from "react";

const Loader = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="w-20 h-20 border-[8px] border-black border-dotted rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
