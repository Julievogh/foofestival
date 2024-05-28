"use client";

import React from "react";
import Timer from "@/app/components/Timer";
import PersonalInfoForm from "@/app/components/PersonalInfoForm";

const PersonalInfo = () => {
  return (
    <>
      <div className="mt-16 mb-8 rounded-lg shadow-md lg:max-w-screen-lg xl:max-w-screen-lg 2xl:max-w-screen-lg lg:mx-auto xl:mx-auto 2xl:mx-auto md:mx-0">
        <Timer duration={5 * 60 * 1000} />
        <PersonalInfoForm />
      </div>
    </>
  );
};

export default PersonalInfo;
