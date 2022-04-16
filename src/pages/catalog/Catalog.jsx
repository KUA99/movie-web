import React from "react";
import { useParams } from "react-router-dom";

import { category as categoryAPI } from "../../api/theMovieDBApi";
import MovieGrid from "../../components/movieGrid/MovieGrid";
import "./catalog.scss";

const Catalog = () => {
  const { category, keyword } = useParams();

  return (
    <div className="catalog container">
      <div className="catalog-header">
        {keyword ? (
          <h2>{`A list of ${category} containing the keyword "${keyword}"`}</h2>
        ) : (
          <h2>{category}</h2>
        )}
      </div>
      <div className="catalog-list">
        <MovieGrid categoryProps={category} />
      </div>
    </div>
  );
};

export default Catalog;
