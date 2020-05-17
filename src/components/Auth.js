import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setName, setPassword, setEmail } from "../actions/Auth";
import { useHttpClient } from "../hooks/http-hook";
import { useAuth } from "../hooks/auth-hook";

const Auth = ({ isSignUp, setShowModal }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { sendRequest, isLoading, error } = useHttpClient();
  const auth = useAuth();

  const name = useSelector((state) => state.authForm.name);
  const password = useSelector((state) => state.authForm.password);
  const email = useSelector((state) => state.authForm.email);

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if (!isSignUp) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          "POST",
          JSON.stringify({
            email: email,
            password: password,
          }),
          { "Content-Type": "application/json" }
        );
        console.log(responseData);
        auth.login(responseData.userId, responseData.token);
        setShowModal(false);
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          "POST",
          JSON.stringify({
            name: name,
            password: password,
            email: email,
          }),
          { "Content-Type": "application/json" }
        );

        auth.login(responseData.userId, responseData.token);
        history.push("/");
        setShowModal(false);
      } catch (err) {}
    }
  };

  return (
    <div className="container">
      <div className="notification">
        <strong> {isSignUp ? "SIGN UP" : "LOGIN"}</strong>
        {isSignUp && (
          <div className="field">
            <label className="label">Username</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="text"
                placeholder="Text input"
                onChange={(e) => dispatch(setName(e.target.value))}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>
          </div>
        )}
        <div className="field">
          <label className="label">
            Email
            <small className="is-size-7 has-text-grey-light">
              {" "}
              ex) ***@***.***
            </small>
          </label>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input"
              type="email"
              placeholder="Email input"
              onChange={(e) => dispatch(setEmail(e.target.value))}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </div>
        </div>

        <div className="field">
          <label className="label">
            Password{" "}
            <small className="is-size-7 has-text-grey-light">
              at least 6 characters
            </small>
          </label>
          <p className="control has-icons-left">
            <input
              name="password"
              className="input"
              type="password"
              placeholder="Password"
              onChange={(e) => dispatch(setPassword(e.target.value))}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button
              className={`button is-link ${isLoading && "is-loading"}`}
              onClick={(e) => authSubmitHandler(e)}
              type="submit"
            >
              Submit
            </button>
          </div>
          <div className="control">
            <button
              className="button is-link is-light"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
          <div className="has-text-centered has-text-danger has-text-justified">
            {error}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
