import React from "react";
import { Link } from "react-router-dom";

import "./movieItem.scss";

import apiConfig from "../../../api/apiConfig";
import { category } from "../../../api/theMovieDBApi";
import { PlayArrow } from "@material-ui/icons";

const MovieItem = (props) => {
  const { item, categoryProps } = props;

  const url = "/" + category[categoryProps] + "/" + item.id;
  const backgroundImage = apiConfig.w500Image(
    item.poster_path || item.backdrop_path
  );

  return (
    <Link to={url}>
      <div
        className="movie-item"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <button>
          <PlayArrow className="movie-item-btn-icon" />
        </button>
      </div>
      <div className="movie-item-content">
        <h3 className="movie-item-content-title">{item.title || item.name}</h3>
      </div>
    </Link>
  );
};

export default MovieItem;
