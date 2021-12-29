import React, { useState, useEffect } from "react";
import { Card, Table } from "react-bootstrap";
import axios from "axios";
import ENDPOINTS from "../enums/endpoint";

export default function Genre() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function getDatas() {
    setData([]);
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      try {
        axios.get(ENDPOINTS.get_genres).then((response) => {
          setIsLoading(false);
          let genres = response.data.genres;
          setData(genres);
        });
      } catch (e) {
        setIsLoading(false);
        setError(e.message);
      }
    }, 1500);
  }

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <div>
      <h3 className="text-start">List Genre</h3>
      <Card>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Genre</th>
              </tr>
            </thead>
            <tbody>
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
              {!isLoading &&
                data.length > 0 &&
                data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}
