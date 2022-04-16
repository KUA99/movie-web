import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Link } from "react-router-dom";

import theMovieDBApi, { category, movieType } from "../../api/theMovieDBApi";
import apiConfig from "../../api/apiConfig";
import "./movielist.scss";
import MovieItem from "./movieItem/MovieItem";
import SwiperCore, { Navigation, Autoplay } from "swiper";

const MovieList = (props) => {
  const { typeProps, categoryProps, id } = props;

  SwiperCore.use([Navigation, Autoplay]);

  const [listItem, setListItem] = useState([]);

  useEffect(() => {
    const getListItem = async () => {
      let response = null;
      const params = {};
      if (typeProps !== "similar") {
        switch (categoryProps) {
          case category.movie:
            response = await theMovieDBApi.getMovieList(typeProps, { params });
            break;
          default:
            response = await theMovieDBApi.getTvList(typeProps, { params });
        }
      } else {
        response = await theMovieDBApi.similar(categoryProps, id);
      }
      setListItem(response.results);
    };
    getListItem();
  }, []);

  return (
    <div className="movie-list">
      <Swiper
        modules={[Navigation, Autoplay]}
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={"auto"}
        navigation={true}
        autoplay={{ delay: 3000 }}
      >
        {listItem.map((item, index) => (
          <SwiperSlide key={index}>
            <MovieItem item={item} categoryProps={categoryProps} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
