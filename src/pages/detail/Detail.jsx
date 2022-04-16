import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./deatail.scss";
import theMovieDBApi from "../../api/theMovieDBApi";
import apiConfig from "../../api/apiConfig";
import { Add, PlayArrow } from "@material-ui/icons";
import imdbLogo from "../../assets/img/imdb.png";
import Credits from "./credits/Credits";
import MovieList from "../../components/movieList/MovieList";
import VideoList from "./videoList/VideoList";

const Detail = () => {
  const { category, id } = useParams();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getDetailMovie = async () => {
      const response = await theMovieDBApi.detail(category, id, { params: {} });
      setMovie(response);
      window.scrollTo(0, 0);
    };
    getDetailMovie();
  }, [category, id]);

  return (
    <>
      {movie && (
        <div className="detail">
          <div className="detail-banner">
            <img
              src={apiConfig.originalImage(
                movie.backdrop_path || movie.poster_path
              )}
              alt="banner logo"
            />
          </div>
          <div className="detail-content">
            <div className="detail-content-img">
              <img
                src={apiConfig.originalImage(
                  movie.poster_path || movie.backdrop_path
                )}
                alt="movie poster"
              />
            </div>
            <div className="detail-content-info">
              <h2>{movie.title || movie.name}</h2>
              <div className="detail-content-info-type">
                {movie.genres.map((item, index) => (
                  <p key={index}>{item.name}</p>
                ))}
              </div>
              <div className="detail-content-info-des">
                <p>{movie.overview}</p>
              </div>
              <div className="detail-content-info-imdb">
                <div className="imdb-rated">
                  <img src={imdbLogo} alt="imdb rated" />
                  <span className="imdb-rated-point">{movie.vote_average}</span>
                </div>
                <p>
                  <span>
                    {category === "movie"
                      ? "Year"
                      : `${movie.seasons.length} seasons`}
                  </span>
                  {category === "movie"
                    ? movie.release_date
                      ? movie.release_date.slice(0, 4)
                      : "2022"
                    : movie.episode_run_time}
                </p>
              </div>
              <div className="detail-content-info-play">
                <a href="#">
                  <PlayArrow className="detail-content-info-play-btn" />
                  <span>play</span>
                </a>
                <a href="#">
                  <Add className="detail-content-info-play-btn" />
                  <span>play list</span>
                </a>
              </div>
            </div>
          </div>
          <div className="detail-cast container">
            <Credits category={category} id={id} />
          </div>
          <div className="detail-video container">
            <h2>trailers</h2>
            <VideoList category={category} id={id} />
          </div>
          <div className="detail-related container">
            <h2>Similar</h2>
            <MovieList categoryProps={category} typeProps="similar" id={id} />
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
