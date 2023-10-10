import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PirateDetail = () => {
  const [pirate, setPirate] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/pirates/${id}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setPirate(res.data);
      })
      .catch((err) => {
        if(err.response.status == 401) {
          navigate('/')
        }
      });
  }, []);

  const updatePirate = (field, value) => {
    axios
      .patch(`http://localhost:8000/api/pirates/${id}`, {
        [field]: value,
      }, { withCredentials: true })
      .then((res) => {
        setPirate(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getButtons = (field, value) => {
    return (
      <div className="toggle-group">
        <span>{value ? "Yes" : "No"}</span>
        <button
          onClick={(e) => updatePirate(field, !value)}
          className={value ? "btn-danger" : "btn-success"}
        >
          {value ? "NO" : "YES"}
        </button>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="nav">
        <h1>{pirate.name}</h1>
        <button onClick={() => navigate("/pirates")}>Crew Board</button>
      </div>
      <div className="pirate-details">
        <div>
          <img src={pirate.image} alt="" />
          <blockquote>"{pirate.phrase}"</blockquote>
        </div>
        <div className="about">
          <h3>About</h3>
          <table>
            <tbody>
              <tr>
                <th scope="row">Position:</th>
                <td>{pirate.position}</td>
              </tr>
              <tr>
                <th scope="row">Treasures:</th>
                <td>{pirate.chests}</td>
              </tr>
              <tr>
                <th scope="row">Peg Leg:</th>
                <td>{getButtons("pegLeg", pirate.pegLeg)}</td>
              </tr>
              <tr>
                <th scope="row">Eye Patch:</th>
                <td>{getButtons("eyePatch", pirate.eyePatch)}</td>
              </tr>
              <tr>
                <th scope="row">Hook Hand:</th>
                <td>{getButtons("hookHand", pirate.hookHand)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PirateDetail;
