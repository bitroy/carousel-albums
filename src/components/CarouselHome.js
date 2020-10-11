import "../styles/CarouselHome.scss";
import React, { useState, useEffect, createContext } from "react";
import Axios from "axios";
import Carousel from "./Carousel";
import ScrollToTop from "./ScrollToTop";

export const CarouselContext = createContext();

const CarouselHome = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Axios.get("https://jsonplaceholder.typicode.com/photos")
      .then((response) => {
        let photos = [];
        response.data.forEach((photo) => {
          const key = "Album_" + photo.albumId;
          if (!photos[key]) {
            photos[key] = [];
          }

          photos[key].push({
            id: photo.id,
            title: photo.title,
            url: photo.url,
            thumbnailUrl: photo.thumbnailUrl,
          });
        });
        setLoading(false);
        setAlbums(photos);
        setError("");
      })
      .catch((error) => {
        setLoading(false);
        setAlbums([]);
        setError("Error in fetching Album");
      });

    return () => {
      setAlbums([]);
    };
  }, []);

  return (
    <div className="CarouselHome">
      <h1>{loading ? "Loading" : "Your Albums"}</h1>
      <h1>{error ? error : null}</h1>
      <CarouselContext.Provider value={{ albums }}>
        <Carousel />
      </CarouselContext.Provider>
      <ScrollToTop />
    </div>
  );
};

export default CarouselHome;
