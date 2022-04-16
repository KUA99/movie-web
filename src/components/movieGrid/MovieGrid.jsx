import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ArrowBack, ArrowForward } from "@material-ui/icons";

import "./moviegrid.scss";
import theMovieDBApi, {
  category,
  movieType,
  tvType,
} from "../../api/theMovieDBApi";
import MovieItem from "../movieList/movieItem/MovieItem";

const MovieGrid = (props) => {
  const { categoryProps } = props;

  const [itemList, setItemList] = useState([]);
  const [pageMovie, setPageMovie] = useState(1);
  const [pageTV, setPageTv] = useState(1);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const nextBtnRef = useRef(null);
  const prevBtnRef = useRef(null);

  const { keyword } = useParams();

  useEffect(() => {
    const getList = async () => {
      let response = null;
      let params = {};
      if (keyword === undefined) {
        switch (categoryProps) {
          case category.movie:
            params = {
              page: pageMovie,
            };
            response = await theMovieDBApi.getMovieList(movieType.upcoming, {
              params,
            });
            break;
          default:
            params = {
              page: pageTV,
            };
            response = await theMovieDBApi.getTvList(tvType.popular, {
              params,
            });
            break;
        }
      } else {
        params = {
          query: keyword,
          page: page,
        };
        response = await theMovieDBApi.search(categoryProps, { params });
      }
      setItemList(response.results);
      setTotalPage(response.total_pages);
    };
    getList();
  }, [categoryProps, keyword, page, pageMovie, pageTV]);

  const handleNext = () => {
    if (keyword) {
      setPage((prevPage) => prevPage + 1);
      window.scrollTo(0, 0);
    }
    switch (categoryProps) {
      case category.movie:
        setPageMovie((prevPage) => prevPage + 1);
        window.scrollTo(0, 0);
        break;
      case category.tv:
        setPageTv((prevPage) => prevPage + 1);
        window.scrollTo(0, 0);
        break;
      default:
        console.log("error");
    }
  };

  const handelPrevious = () => {
    if (keyword) {
      setPage((prevPage) => prevPage - 1);
      window.scrollTo(0, 0);
    }
    switch (categoryProps) {
      case category.movie:
        setPageMovie((prevPage) => prevPage - 1);
        window.scrollTo(0, 0);
        break;
      case category.tv:
        setPageTv((prevPage) => prevPage - 1);
        window.scrollTo(0, 0);
        break;
      default:
        console.log("error");
    }
  };

  return (
    <>
      <div className="movie-grid">
        {itemList.map((item, index) => (
          <MovieItem categoryProps={categoryProps} item={item} key={index} />
        ))}
      </div>

      <div className="movie-grid-pagination">
        <button
          onClick={handelPrevious}
          ref={prevBtnRef}
          className={
            pageMovie <= 1 && pageTV <= 1 && page <= 1 ? "disabled" : ""
          }
        >
          <ArrowBack className="pagination-icon" />
        </button>
        <button
          onClick={handleNext}
          ref={nextBtnRef}
          className={
            pageMovie >= totalPage && pageTV >= totalPage && page >= totalPage
              ? "disabled"
              : ""
          }
        >
          <ArrowForward className="pagination-icon" />
        </button>
      </div>
    </>
  );
};

export default MovieGrid;
