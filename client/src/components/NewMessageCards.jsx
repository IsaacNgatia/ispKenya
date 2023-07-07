import React from "react";

const NewMessageCards = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-10">
      <div className="flex flex-col items-center bg-gray-200 h-auto w-auto min-w-32 lg:h-24 lg:w-56 rounded-md px-5 lg:px-0 md:py-5 lg:py-7">
        <h1>Credit Balance (Ksh)</h1>
        <h2>0</h2>
      </div>
      <div className="flex flex-col items-center bg-gray-200 h-auto w-auto min-w-32 lg:h-24 lg:w-56 rounded-md px-5 lg:px-0 md:py-5 lg:py-7">
        <h1>Total Expiry Alert SMS</h1>
        <h2>0</h2>
      </div>
      <div className="flex flex-col items-center bg-gray-200 h-auto w-auto min-w-32 lg:h-24 lg:w-56 rounded-md px-5 lg:px-0 md:py-5 lg:py-7">
        <h1>Total Acknowledgement SMS</h1>
        <h2>0</h2>
      </div>
      <div className="flex flex-col items-center bg-gray-200 h-auto w-auto min-w-32 lg:h-24 lg:w-56 rounded-md px-5 lg:px-0 md:py-5 lg:py-7">
        <h1>Total Composed SMS</h1>
        <h2>0</h2>
      </div>
    </div>
  );
};

export default NewMessageCards;
