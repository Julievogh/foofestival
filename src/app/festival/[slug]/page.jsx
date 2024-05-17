import React from "react";
import styles from "../../page.module.css";
import Image from "next/image";
import LikeButton from "../../components/LikeButton.jsx";
import Breadcrumbs from "../../components/Breadcrumbs";

export default async function Page({ params }) {
  const { slug } = params;
  console.log(slug);

  const response = await fetch(`http://localhost:8080/bands/${slug}`);
  if (!response.ok) {
    throw new Error("Failed to fetch band data");
  }
  const data = await response.json();
  console.log(data);

  const paths = [
    { href: "/", label: "Home" },
    { href: "/festival", label: "Festival" },
    { href: `/festival/${slug}`, label: data.name }, // Dynamically set href and label
  ];

  return (
    <main>
      <div>
        <Breadcrumbs paths={paths} />
      </div>
      <div className={styles.mainBand}>
        <h1>{data.name}</h1>
        <div>
          <LikeButton slug={data.slug} />
        </div>

        <div></div>

        <div>
          <Image
            src={data.logo.startsWith("https://") ? data.logo : `http://localhost:8080/logos/${data.logo}`}
            alt={data.logoCredits}
            width={200}
            height={200}
          />
        </div>
        <div>
          <p>Genre: {data.genre}</p>

          <p>{data.bio}</p>
          <h5>Members:</h5>
          <p>{data.members.map((member) => member).join(", ")}</p>
        </div>
        <div>
          <p>When are they playing?</p>
          <p>INFO FROM SCHEDULE API</p>
        </div>
      </div>
    </main>
  );
}
