import React, { useState, useEffect } from "react";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import "./slides.scss";
import theMovieDBApi, { category, movieType } from "../../api/theMovieDBApi";
import SlideItem from "./slideItem/SlideItem";
import SlideTrailerModal from "./slideTrailerModal/SlideTrailerModal";

const Slides = () => {
  SwiperCore.use([Autoplay]);

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await theMovieDBApi.getMovieList(movieType.popular, {
          params,
        });
        setMovies(response.results.slice(0, 4));
      } catch {
        console.log("Failed");
      }
    };

    getMovies();
  }, []);

  return (
    <div className="slides">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 4000 }}
      >
        {movies.map((movieItem, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <SlideItem
                movieItem={movieItem}
                className={`${isActive ? "active" : ""}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {movies.map((movieItem, index) => (
        <SlideTrailerModal
          key={index}
          movieItem={movieItem}
        ></SlideTrailerModal>
      ))}
    </div>
  );
};

export default Slides;
