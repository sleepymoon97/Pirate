import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [validation, setValidation] = useState({});

  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/register",
        {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => navigate("/pirates"))
      .catch((err) => {
        console.log(err);
        setValidation(err.response.data.errors);
      });
  };

  const login = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/login",
        {
          email: loginEmail,
          password: loginPassword,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => navigate("/pirates"))
      .catch((error) => {
        console.log(error);
        console.log("error");
      });
  };

  return (
    <>
      <div className="container1">
        <div className="user-form">
          <h2>REGISTER</h2>
          <form onSubmit={register}>
            <label>First Name: </label>
            <input type="text" onChange={(e) => setFirstName(e.target.value)} />
            <label>Last Name: </label>
            {validation.email ? (
              <p className="validation-message">{validation.email.message}</p>
            ) : (
              ""
            )}
            <input type="text" onChange={(e) => setLastName(e.target.value)} />
            <label>Email: </label>
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
            <label>Password: </label>
            <input type="text" onChange={(e) => setPassword(e.target.value)} />
            <label>Confirm Password: </label>
            <input
              type="text"
              onChange={(e) => setConfirmPassword(e.target.value)}
            /> <br />
            <button>Register</button>
          </form>
        </div>
        
        <div className="user-form">
          <h2>Login</h2>
          <form onSubmit={login}>
            <label>Email: </label>
            <input
              type="text"
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <label>Password: </label>
            <input
              type="text"
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button>Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserForm;
