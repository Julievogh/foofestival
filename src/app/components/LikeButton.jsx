"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const LikeButton = ({ slug }) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Check if the band is already liked when the component mounts
    const likedBands = JSON.parse(localStorage.getItem("likedBands")) || [];
    setIsLiked(likedBands.includes(slug));
  }, [slug]);

  const handleLike = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked); // Toggle isLiked based on previous state
    if (!isLiked) {
      addLikedBand(slug);
    } else {
      removeLikedBand(slug);
    }
  };

  const addLikedBand = (slug) => {
    let likedBands = JSON.parse(localStorage.getItem("likedBands")) || [];
    likedBands.push(slug);
    localStorage.setItem("likedBands", JSON.stringify(likedBands));
    console.log(`Added ${slug} to liked bands:`, likedBands);
  };

  const removeLikedBand = (slug) => {
    let likedBands = JSON.parse(localStorage.getItem("likedBands")) || [];
    const index = likedBands.indexOf(slug);
    if (index !== -1) {
      likedBands.splice(index, 1);
      localStorage.setItem("likedBands", JSON.stringify(likedBands));
      console.log(`Removed ${slug} from liked bands:`, likedBands);
    }
  };

  console.log("isLiked:", isLiked);

  return (
    <div>
      <button onClick={handleLike}>
        {isLiked ? (
          <Image src="/icons/like.png" alt="Liked" width={20} height={20} />
        ) : (
          <Image src="/icons/heart.png" alt="Not Liked" width={20} height={20} />
        )}
      </button>
      <span>{isLiked ? "Added to Favorites!" : "Favorite?"}</span>
    </div>
  );
};

export default LikeButton;
