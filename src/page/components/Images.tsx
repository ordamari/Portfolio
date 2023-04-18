import { useEffect, useRef, useState } from "react";

type Image = {
  src: string;
  alt: string;
};

type PrivateProps = {
  images: Image[];
};

export function Images({ images }: PrivateProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const timeOutRef = useRef<number>(0);

  const changeImage = () => {
    setSelectedImageIndex((prev) => {
      return prev === images.length - 1 ? 0 : prev + 1;
    });
  };

  const startTimeOut = () => {
    timeOutRef.current = window.setTimeout(changeImage, 3000);
  };

  const stopTimeOut = () => {
    clearTimeout(timeOutRef.current);
  };

  useEffect(() => {
    stopTimeOut();
    startTimeOut();
    return () => {
      stopTimeOut();
    };
  }, [selectedImageIndex]);

  return (
    <img
      onClick={changeImage}
      onMouseEnter={stopTimeOut}
      onMouseLeave={startTimeOut}
      src={images[selectedImageIndex] ? images[selectedImageIndex].src : ""}
      alt={images[selectedImageIndex] ? images[selectedImageIndex].alt : ""}
    />
  );
}
