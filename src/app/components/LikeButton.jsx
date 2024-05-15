"use client";
import React, { useState } from "react";
import Image from "next/image";
const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  return (
    <div>
      <button onClick={handleLike}>
        {isLiked ? (
          <Image src="/icons/like.png" alt="Liked" width={20} height={20} />
        ) : (
          <Image src="/icons/heart.png" alt="Liked" width={20} height={20} />
        )}
      </button>
      <span>{likes === 1 ? "Added to Favorites!" : "Favorite?"}</span>
    </div>
  );
};

export default LikeButton;
