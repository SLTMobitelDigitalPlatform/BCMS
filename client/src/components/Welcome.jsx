import React from "react";
import userAcc from "../assets/Vector.png";

const Welcome = () => {
  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-blue-900 to-green-500 p-1 rounded-lg m-10 lg:mb-0 lg:mr-16 w-72 lg:w-1/5 lg:h-full">
      <div className="flex flex-col items-center justify-center bg-white p-20 rounded-lg w-full h-full">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-900">Welcome!</h2>
          <div className="flex justify-center m-4">
            <img src={userAcc} alt="user profile" className="w-16 h-16" />
          </div>
          <h2 className="font-bold text-blue-900 text-xl">Pasindu Jayakodi</h2>
          <p className="text-blue-900 text-md">pasindujayakodi@slt.com</p>
          <p className="text-blue-900 text-md">Employee</p>
          <p className="text-blue-900 text-md">Digital Platform</p>
          <p className="text-blue-900 text-md">Service no 65987</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
