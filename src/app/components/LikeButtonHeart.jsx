"use client";
import React, { useState } from "react";
import Image from "next/image";

const LikeButtonHeart = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  n;
  return (
    <button onClick={handleLike}>
      {isLiked ? (
        <Image src="/icons/like.png" alt="Liked" width={20} height={20} />
      ) : (
        <Image src="/icons/heart.png" alt="Not Liked" width={20} height={20} />
      )}
    </button>
  );
};

export default LikeButtonHeart;
