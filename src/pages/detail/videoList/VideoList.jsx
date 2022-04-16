import React, { useState, useEffect } from "react";

import "./videolist.scss";
import theMovieDBApi from "../../../api/theMovieDBApi";

const VideoList = (props) => {
  const { category, id } = props;
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      const response = await theMovieDBApi.getVideos(category, id, {
        params: {},
      });
      setVideos(response.results.slice(0, 4));
    };
    getVideos();
  }, [category, id]);

  return (
    <div className="video-list">
      {videos.map((video, index) => (
        <div className="video-list-content" key={index}>
          <h2>{video.name}</h2>
          <iframe src={`https://www.youtube.com/embed/${video.key}`}></iframe>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
