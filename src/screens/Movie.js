import React, { useState, useEffect } from "react";
import { Card, Button, Pagination } from "react-bootstrap";
import axios from "axios";
import ENDPOINTS from "../enums/endpoint";

export default function Movie() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  function goToPage(number) {
    setPage(number);
    getDatas();
  }

  function getDatas() {
    setData([]);
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      try {
        axios
          .get(ENDPOINTS.get_movies, {
            params: {
              page: page,
            },
          })
          .then((response) => {
            setIsLoading(false);
            setData(response.data.results);
            setTotalPages(response.data.total_pages);
            getPagination();
          });
      } catch (e) {
        setIsLoading(false);
        setError(e.message);
      }
    }, 1500);
  }

  function getPagination() {
    let items = [];

    for (let number = page; number <= 5; number++) {
      if (number <= totalPages) {
        items.push(
          <Pagination.Item
            onClick={() => goToPage(number)}
            key={number}
            active={number === page}
          >
            {number}
          </Pagination.Item>
        );
      }
    }

    return items;
  }

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <div>
      <h3 className="text-start">List Movie</h3>

      {!isLoading && data.length == 0 && error == null && (
        <tr>
          <td colSpan={2} className="text-center">
            No Data Available
          </td>
        </tr>
      )}
      {!isLoading && data.length == 0 && error != null && (
        <tr>
          <td colSpan={2} className="text-center">
            {error}
          </td>
        </tr>
      )}
      {isLoading && data.length == 0 && (
        <tr>
          <td colSpan={2} className="text-center">
            Loading Data...
          </td>
        </tr>
      )}
      <div className="row">
        {!isLoading &&
          data.length > 0 &&
          data.map((item, index) => (
            <div className="col-md-4 p-1" key={index}>
              <Card>
                <Card.Img
                  variant="top"
                  src={ENDPOINTS.get_poster + item.poster_path}
                />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.overview.substring(0, 100)}...</Card.Text>
                  <Button variant="primary">More 'bout this movie</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>

      {!isLoading && data.length > 0 && (
        <div>
          <hr />
          <Pagination>
            {page > 1 && <Pagination.First onClick={() => goToPage(1)} />}
            {page > 1 && <Pagination.Prev onClick={() => goToPage(page - 1)} />}
            {getPagination()}
            {page < totalPages && (
              <Pagination.Next onClick={() => goToPage(page + 1)} />
            )}
            {page < totalPages && (
              <Pagination.Last onClick={() => goToPage(totalPages)} />
            )}
          </Pagination>
        </div>
      )}
    </div>
  );
}
