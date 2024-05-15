import React from "react";
import styles from "../../page.module.css";
import Image from "next/image";

export default async function Page({ params }) {
  const { slug } = params;
  console.log(slug);

  const response = await fetch(`http://localhost:8080/bands/${slug}`);
  if (!response.ok) {
    throw new Error("Failed to fetch band data");
  }
  const data = await response.json();
  console.log(data);

  return (
    <main>
      <h1>{data.name}</h1>
      <p>Genre: {data.genre}</p>
      <div>
        <Image
          src={data.logo.startsWith("https://") ? data.logo : `http://localhost:8080/logos/${data.logo}`}
          alt={data.logoCredits}
          width={200}
          height={200}
        />
      </div>
      <div>
        <p>{data.bio}</p>
        <h5>Members:</h5>
        <p>{data.members.map((member) => member).join(", ")}</p>
      </div>
    </main>
  );
}
