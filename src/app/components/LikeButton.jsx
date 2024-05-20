"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../page.module.css"; // Assuming styles are imported from the same file

const LikeButton = ({ slug, className }) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const likedBands = JSON.parse(localStorage.getItem("likedBands")) || [];
    setIsLiked(likedBands.includes(slug));
  }, [slug]);

  const handleLike = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
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
  };

  const removeLikedBand = (slug) => {
    let likedBands = JSON.parse(localStorage.getItem("likedBands")) || [];
    const index = likedBands.indexOf(slug);
    if (index !== -1) {
      likedBands.splice(index, 1);
      localStorage.setItem("likedBands", JSON.stringify(likedBands));
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`${styles.likeButton} ${className}`}
    >
      {isLiked ? (
        <Image src="/icons/heartline.svg" alt="Liked" width={20} height={20} />
      ) : (
        <Image
          src="/icons/heartfill-blue.svg"
          alt="Not Liked"
          width={20}
          height={20}
        />
      )}
    </button>
  );
};

export default LikeButton;
