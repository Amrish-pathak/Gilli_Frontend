import React, { useState, useEffect } from "react";


const images = [
  { src: "/home/tally-front-img.png", alt: "Banner 1" },
  { src: "/home/slider-1-1.jpeg", alt: "Banner 2" },
  { src: "/home/slider-2-1.jpeg", alt: "Banner 3" },
  { src: "/home/Tallyprime-4.1.jpeg", alt: "Banner 4" }
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider">
      <div className="slides">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? "active" : ""}`}
            style={{ display: index === currentSlide ? "block" : "none" }}
          >
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
