import { useState, useEffect } from "react";

/**
 * Custom hook to select a random image from an array of image URLs at regular intervals.
 *
 * @param images - An array of string URLs representing the images.
 * @param intervalDuration - The duration between each image change in milliseconds.
 *
 * @returns The current image URL as a string. The image is randomly selected from the provided array at intervals specified by `intervalDuration`.
 *
 * @remarks
 * This hook sets up an interval to update the current image. The interval is cleared when the component using this hook is unmounted, to prevent memory leaks.
 * The initial image shown is the fifth one in the provided `images` array (index 4), but this changes to a random image once the interval kicks in.
 */
export const useRandomHomeImage = (
  images: string[],
  intervalDuration: number
) => {
  const [currentImage, setCurrentImage] = useState(images[4]);

  useEffect(() => {
    const updateImage = () => {
      const randomIndex = Math.floor(Math.random() * images.length);
      setCurrentImage(images[randomIndex]);
    };

    const interval = setInterval(updateImage, intervalDuration);
    return () => clearInterval(interval);
  }, [images, intervalDuration]);

  return currentImage;
};
