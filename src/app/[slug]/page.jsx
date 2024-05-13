import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "../page.module.css";

async function getBand() {
  const response = await fetch(`http://localhost:8080/bands?slug=${slug}`);
  const data = await response.json();
  return data;
}

export default async function bandPage() {
  const data = await getBand();
  const { name, logo, bio, members } = data;

  return (
    <main className="md:flex max-w-7xl mx-auto">
      <Image
        src="https://images.unsplash.com/photo-1517849845537-4d257902454a"
        alt="A cute dog"
        width={3024}
        height={4032}
        priority={true} // disables lazy load
        className="w-full md:w-1/2 xl:w-[600px]"
        sizes="(max-width: 768px) 100vw,
           (max-width: 1280px) 50vw,
           600px"
      />
      <div>
        <h1 className="text-3xl">My name is {name}</h1>
        <p>
          My favorite color is <span className="text-yellow-400">{favouriteColor}</span>
        </p>

        <p>I am {age} years old. </p>
      </div>
    </main>
  );
}
