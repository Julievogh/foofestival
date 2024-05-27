// app/lib/colorThief.js
import ColorThief from "colorthief";

export const getDominantColor = (imgUrl) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imgUrl;

    img.onload = () => {
      const colorThief = new ColorThief();
      try {
        const dominantColor = colorThief.getColor(img);
        console.log("Dominant color fetched:", dominantColor);
        resolve(dominantColor);
      } catch (error) {
        console.error("ColorThief error:", error);
        reject(error);
      }
    };

    img.onerror = (error) => {
      console.error("Image loading error:", error);
      reject(error);
    };
  });
};
