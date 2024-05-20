"use client";

import React from "react";
import Timer from "@/app/components/Timer";

const PersonalInfo = () => {
  return (
    <>
      <h3>Personal info</h3>
      <Timer duration={10 * 60 * 1000} />
    </>
  );
};

export default PersonalInfo;
