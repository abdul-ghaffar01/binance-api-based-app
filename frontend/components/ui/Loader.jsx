import React from "react";

const Loader = ({className}) => {
  return (
    <div className={`w-full h-full inset-0 flex items-center justify-center z-50 ${className}`}>
      <span className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></span>
    </div>
  );
};

export default Loader;
