import React from "react";
import { Link } from "react-router-dom";

import MovieList from "../../components/movieList/MovieList";
import Slides from "../../components/slides/Slides";
import theMovieDBApi, {
  category,
  movieType,
  tvType,
} from "../../api/theMovieDBApi";
import "./home.scss";

const Home = () => {
  return (
    <>
      <Slides />
      <div className="container">
        <div className="movie-list">
          <div className="movie-list-header">
            <h2 className="movie-list-title">hot movies</h2>
            <Link to="/movie">
              <button className="movie-list-btn">view more</button>
            </Link>
          </div>
          <MovieList
            categoryProps={category.movie}
            typeProps={movieType.popular}
          />
        </div>
        <div className="movie-list">
          <div className="movie-list-header">
            <h2 className="movie-list-title">top rared movie</h2>
            <Link to="/movie">
              <button className="movie-list-btn">view more</button>
            </Link>
          </div>
          <MovieList
            categoryProps={category.movie}
            typeProps={movieType.top_rated}
          />
        </div>
        <div className="movie-list">
          <div className="movie-list-header">
            <h2 className="movie-list-title">hot tv series</h2>
            <Link to="/tv">
              <button className="movie-list-btn">view more</button>
            </Link>
          </div>
          <MovieList categoryProps={category.tv} typeProps={tvType.popular} />
        </div>
        <div className="movie-list">
          <div className="movie-list-header">
            <h2 className="movie-list-title">top rated tv series</h2>
            <Link to="/tv">
              <button className="movie-list-btn">view more</button>
            </Link>
          </div>
          <MovieList categoryProps={category.tv} typeProps={tvType.top_rated} />
        </div>
      </div>
    </>
  );
};

export default Home;
