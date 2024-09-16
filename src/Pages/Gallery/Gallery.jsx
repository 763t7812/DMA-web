import React, { useState, useEffect } from "react";
import ApiUrl from "../../Common/ApiUrl";
import VideoRental from "../../assets/Images/Video2.mp4";

const Gallery = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `${ApiUrl}/get-images`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const data = await response.json();
        console.log("images data:", data); // Log the images data from the API
        setImages(data); // Set the array of image objects to state
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  console.log("images state:", images); // Log the images state to verify

  return (
    <div className="container mx-auto p-4">
      {/* Video banner */}
      <div className="mb-8">
        <div className="relative h-96 overflow-hidden rounded-lg shadow-lg">
          <video
            autoPlay
            muted
            loop
            controls
            className="w-full h-full object-cover"
          >
            <source src={VideoRental} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Image gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => {
          const imageUrl = `${ApiUrl}/gallery/${
            image.filename
          }?t=${new Date().getTime()}`;
          console.log(`Image URL ${index}:`, imageUrl); // Log the constructed URL
          return (
            <div
              key={index}
              className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src={imageUrl} // Construct URL using ApiUrl and filename
                alt={`Gallery Image ${index + 1}`}
                className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/150";
                }} // Fallback image on error
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
