import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PirateList = () => {
  const [pirates, setPirates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pirates", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setPirates(res.data);
      })
      .catch((err) => {
        if(err.response.status == 401) {
          navigate('/')
        }
      });
  }, []);

  const deletePirate = (id) => {
    axios
      .delete(`http://localhost:8000/api/pirates/${id}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setPirates(pirates.filter((pirate) => pirate._id != id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="nav">
        <h1>Pirate Crew</h1>
        <button onClick={() => navigate("/pirates/new")}>Add Pirate</button>
      </div>

      {pirates &&
        pirates
          .sort((a, b) =>
            a["name"].toLowerCase().localeCompare(b["name"].toLowerCase())
          )
          .map((pirate, index) => {
            return (
              <div className="pirate" key={index}>
                <img src={pirate.image} alt="" />
                <div className="info">
                  <h3>{pirate.name}</h3>
                  <div className="btn-group">
                    <button onClick={() => navigate(`/pirates/${pirate._id}`)}>
                      View Pirate
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => deletePirate(pirate._id)}
                    >
                      Walk the Plank
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default PirateList;
