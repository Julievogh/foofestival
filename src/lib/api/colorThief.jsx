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
        resolve(dominantColor);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = (error) => {
      reject(error);
    };
  });
};
