import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import ENDPOINTS from "../enums/endpoint";

export default function MovieDetail() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function getData() {
    setData([]);
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      try {
        axios.get(ENDPOINTS.get_movie(id)).then((response) => {
          setIsLoading(false);
          setData(response.data);
        });
      } catch (e) {
        setIsLoading(false);
        setError(e.message);
      }
    }, 1500);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="text-start">
      {isLoading && <p>Loading Data...</p>}
      {!isLoading && error != null && <p>{error}</p>}
      {!isLoading && data && (
        <div className="row">
          <div className="col-md-5">
            <img
              className="img-fluid"
              src={ENDPOINTS.get_poster + data.poster_path}
            />
          </div>
          <div className="col-md-7">
            <h3>
              {data.title} (⭐ {data.vote_average} - {data.vote_count})
            </h3>
            <p>{data.overview}</p>
            <span className="badge bg-primary">{data.status}</span>
            <hr />
            <b>Genre</b>
            <p>
              {data.genres &&
                data.genres.map((genre, index) => (
                  <span key={"genre" + index}>{genre.name},</span>
                ))}
            </p>
            <b>Production Company</b>
            <p>
              {data.production_companies &&
                data.production_companies.map((genre, index) => (
                  <span key={"production_companies" + index}>
                    {genre.name},
                  </span>
                ))}
            </p>
            <b>Release Date</b>
            <p>{data.release_date}</p>
          </div>
        </div>
      )}
    </div>
  );
}
