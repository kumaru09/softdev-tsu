import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/login";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const initialFromState = { username: "", password: "" };
  const [input, setInput] = useState(initialFromState);
  const [submitted, setSubmitted] = useState(false);
  const loggingin = useSelector((state) => state.login.loggingin);

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleSumbit = (event) => {
    event.preventDefault();

    setSubmitted(true);
    if (input.username && input.password)
      dispatch(login(input.username, input.password));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
        <h3>Login</h3>
          <form onSubmit={handleSumbit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className={
                  "form-control" +
                  (submitted && !input.username ? " is-invalid" : "")
                }
                name="username"
                value={input.username}
                onChange={handleInputChange}
              />
              {submitted && !input.username && (
                <div className="invalid-feedback">Username is required</div>
              )}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="text"
                className={
                  "form-control" +
                  (submitted && !input.password ? " is-invalid" : "")
                }
                name="password"
                value={input.password}
                onChange={handleInputChange}
              />
              {submitted && !input.password && (
                <div className="invalid-feedback">Password is required</div>
              )}
            </div>
            <button className="btn btn-primary" type="submit">
              {loggingin && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              Login
            </button>
            <Link to="/register" className="btn btn-link">
              Register
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
