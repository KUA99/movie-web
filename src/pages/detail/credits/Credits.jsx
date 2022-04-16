import React, { useState, useEffect } from "react";

import "./credits.scss";
import theMovieDBApi, { category } from "../../../api/theMovieDBApi";
import apiConfig from "../../../api/apiConfig";

const Credits = (props) => {
  const { category, id } = props;
  const [credit, setCredit] = useState([]);

  useEffect(() => {
    const getCredits = async () => {
      let response = await theMovieDBApi.credits(category, id, { params: {} });
      setCredit(response.cast.slice(0, 6));
    };
    getCredits();
  }, [category, id]);

  return (
    <div className="credit">
      <h2>casts</h2>
      <ul className="credit-content">
        {credit.map((item, index) => (
          <li key={index}>
            <div className="credit-image">
              <img
                src={apiConfig.w500Image(item.profile_path)}
                alt="cast image"
              />
            </div>
            <div className="credit-name">
              <p>{item.name || item.original_name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Credits;
