import React from "react";
import { useNavigate } from "react-router-dom";

import apiConfig from "../../../api/apiConfig";
import imdbLogo from "../../../assets/img/imdb.png";
import "./slideitem.scss";
import theMovieDBApi, { category, movieType } from "../../../api/theMovieDBApi";

const SlideItem = (props) => {
  const { movieItem, className } = props;

  const navigate = useNavigate();

  const imgBackground = apiConfig.originalImage(
    movieItem.backdrop_path || movieItem.poster_path
  );

  const handleNavigate = (id) => {
    navigate("/movie/" + id);
  };

  const setSlideTrailerModalActive = async () => {
    const modal = document.querySelector(`#modal-${movieItem.id}`);
    const trailers = await theMovieDBApi.getVideos(
      category.movie,
      movieItem.id
    );
    const modalIframe = modal.querySelector(".modal-content > iframe");

    if (trailers.results.length > 0) {
      const trailerSrc =
        "https://www.youtube.com/embed/" + trailers.results[0].key;
      modalIframe.setAttribute("src", trailerSrc);
    } else {
      modal.querySelector(".modal-content").innerHTML = "No trailer found";
    }

    modal.classList.toggle("active");
  };

  return (
    <div
      className={`slide-item ${className}`}
      style={{ backgroundImage: `url(${imgBackground})` }}
    >
      <div className="slide-item-content container">
        <div className="slide-item-content-info">
          <h2 className="title">{movieItem.title}</h2>
          <div className="vote">
            <img src={imdbLogo} alt="imdb Logo" />
            <p>{movieItem.vote_average}</p>
            <p>{movieItem.release_date.slice(0, 4)}</p>
          </div>
          <div className="overview">{movieItem.overview}</div>
          <div className="btn-group">
            <button onClick={() => handleNavigate(movieItem.id)}>
              watch now
            </button>
            <button onClick={setSlideTrailerModalActive}>watch trailer</button>
          </div>
        </div>
        <div className="slide-item-content-poster">
          <img
            src={apiConfig.w500Image(movieItem.poster_path)}
            alt="movie poster"
          />
        </div>
      </div>
    </div>
  );
};

export default SlideItem;
