"use client";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const CarouselComponent = () => {
  return (
    <div style={{ width: "70%", margin: "20px auto" }}>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={true}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        <div>
          <Image src="/foodstall2.png" alt="Item 1" width={400} height={400} />
        </div>
        <div>
          <Image src="/stage3.png" alt="Item 2" width={400} height={400} />
        </div>
        <div>
          <Image src="/foodstall3.png" alt="Item 3" width={400} height={400} />
        </div>
        <div>
          <Image src="/foodstall.png" alt="Item 4" width={400} height={400} />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
