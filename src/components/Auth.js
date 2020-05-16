import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setName, setPassword, setEmail } from "../actions/Auth";
import { useHttpClient } from "../hooks/http-hook";
import { useAuth } from "../hooks/auth-hook";

const Auth = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { sendRequest } = useHttpClient();
  const auth = useAuth();

  const name = useSelector((state) => state.authForm.name);
  const password = useSelector((state) => state.authForm.password);
  const email = useSelector((state) => state.authForm.email);

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if (!props.isSignUp) {
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
        history.push("/");
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
      } catch (err) {}
    }
  };

  return (
    <div class="container">
      <div class="notification">
        <strong> {props.isSignUp ? "SIGN UP" : "LOGIN"}</strong>
        {props.isSignUp && (
          <div class="field">
            <label class="label">Username</label>
            <div class="control has-icons-left has-icons-right">
              <input
                name="name"
                class="input"
                type="text"
                placeholder="Text input"
                onChange={(e) => dispatch(setName(e.target.value))}
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
          </div>
        )}
        <div class="field">
          <label class="label">Email</label>
          <div class="control has-icons-left has-icons-right">
            <input
              class="input"
              type="email"
              placeholder="Email input"
              onChange={(e) => dispatch(setEmail(e.target.value))}
            />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </div>
        </div>

        <div class="field">
          <label class="label">Password</label>
          <p class="control has-icons-left">
            <input
              name="password"
              class="input"
              type="password"
              placeholder="Password"
              onChange={(e) => dispatch(setPassword(e.target.value))}
            />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button
              class="button is-link"
              onClick={(e) => authSubmitHandler(e)}
            >
              Submit
            </button>
          </div>
          <div class="control">
            <button class="button is-link is-light">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
