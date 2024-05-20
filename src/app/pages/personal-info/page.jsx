"use client"

import React from 'react';
import Timer from '@/app/components/Timer';

const PersonalInfo = () => {
  return (
    <>
      <div className="text-red-500">personal info</div>
      <Timer duration={10 * 60 * 1000} />
    </>
  );
};

export default PersonalInfo;