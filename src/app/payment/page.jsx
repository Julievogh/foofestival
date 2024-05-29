"use client";

import React from "react";
import Payment from "../components/Payment";
import Timer from "../components/Timer";

const page = () => {
  return (
    <div className="mt-16 mb-8 rounded-lg shadow-md lg:max-w-screen-lg xl:max-w-screen-lg 2xl:max-w-screen-lg lg:mx-auto xl:mx-auto 2xl:mx-auto md:mx-0">
      <Payment />
    </div>
  );
};

export default page;
