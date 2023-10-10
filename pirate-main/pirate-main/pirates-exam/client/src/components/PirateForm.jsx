import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PirateForm = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [chests, setChests] = useState("");
  const [phrase, setPhrase] = useState("");
  const [position, setPosition] = useState("");
  const [pegLeg, setPegLeg] = useState(true);
  const [eyePatch, setEyePatch] = useState(true);
  const [hookHand, setHookHand] = useState(true);
  const [validation, setValidation] = useState({});

  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/pirates", {
        name,
        image,
        chests,
        phrase,
        position,
        pegLeg,
        eyePatch,
        hookHand,
      }, { withCredentials: true })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/pirates");
      })
      .catch((err) => {
        console.log(err);
        setValidation(err.response.data.errors);
      });
  };

  return (
    <div className="container">
      <div className="nav">
        <h1>Pirate Crew</h1>
        <button onClick={() => navigate("/pirates")}>Crew Board</button>
      </div>

      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          {validation.name ? (
            <p className="validation-message">{validation.name.message}</p>
          ) : (
            ""
          )}
          <label htmlFor="name">Pirate Name:</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          {validation.image ? (
            <p className="validation-message">{validation.image.message}</p>
          ) : (
            ""
          )}
          <label htmlFor="image">Image Url:</label>
          <input type="text" onChange={(e) => setImage(e.target.value)} />
        </div>
        <div className="form-group">
          {validation.chests ? (
            <p className="validation-message">{validation.chests.message}</p>
          ) : (
            ""
          )}
          <label htmlFor="chests"># of Treasure Chests:</label>
          <input type="number" onChange={(e) => setChests(e.target.value)} />
        </div>
        <div className="form-group">
          {validation.phrase ? (
            <p className="validation-message">{validation.phrase.message}</p>
          ) : (
            ""
          )}
          <label htmlFor="phrase">Pirate Catch Phrases:</label>
          <input type="text" onChange={(e) => setPhrase(e.target.value)} />
        </div>
        <div className="form-group">
          {validation.position ? (
            <p className="validation-message">{validation.position.message}</p>
          ) : (
            ""
          )}
          <label htmlFor="position">Crew Position:</label>
          <select name="position" onChange={(e) => setPosition(e.target.value)}>
            <option value="">Select</option>
            <option value="Captain">Captain</option>
            <option value="First Mate">First Mate</option>
            <option value="Quarter Master">Quarter Master</option>
            <option value="Boatswain">Boatswain</option>
            <option value="Powder Monkey">Powder Monkey</option>
          </select>
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              value={pegLeg}
              defaultChecked={pegLeg}
              onChange={(e) => setPegLeg(e.target.checked)}
            />
            Peg Leg
          </label>
          <label>
            <input
              type="checkbox"
              value={eyePatch}
              defaultChecked={eyePatch}
              onChange={(e) => setEyePatch(e.target.checked)}
            />
            Eye Patch
          </label>
          <label>
            <input
              type="checkbox"
              value={hookHand}
              defaultChecked={hookHand}
              onChange={(e) => setHookHand(e.target.checked)}
            />
            Hook Hand
          </label>
        </div>
        <button type="submit">Add Pirate</button>
      </form>
    </div>
  );
};

export default PirateForm;
