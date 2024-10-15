import React from "react";

const Button = ({
  children,
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  type = "button",
  ...props
}) => {
  return (
    <button
      className={`px-6 py-3 rounded-md ${className} ${textColor} ${bgColor}`}
      {...props} // remaining prop attributes
    >
      {children}
    </button>
  );
};

export default Button;
