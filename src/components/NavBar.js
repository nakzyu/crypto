import React, { useState, Fragment } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import Auth from "./Auth";
import { useAuth } from "../hooks/auth-hook";
import { useSelector } from "react-redux";

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const auth = useAuth();
  const token = useSelector((state) => state.auth.token);
  const isToggleActive = () => {
    if (toggle) return "is-active";
  };
  const isModalActive = () => {
    if (showModal) return "is-active";
  };

  return (
    <Fragment>
      <nav className="navbar " role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <div className="navbar-item">
            <img
              src="https://bulma.io/images/bulma-logo.png"
              width="112"
              height="28"
              alt="navbar"
            />
          </div>

          <div
            role="button"
            onClick={() => setToggle(!toggle)}
            className={`navbar-burger burger ${isToggleActive()}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>

        <div
          id="navbarBasicExample"
          className={`navbar-menu ${isToggleActive()}`}
        >
          <div className="navbar-start">
            <NavLink to="/" exact>
              <div className="navbar-item">Coins</div>
            </NavLink>
            <NavLink to="/myPortfolios" exact>
              <div className="navbar-item">My Portfolios</div>
            </NavLink>
            <NavLink to="/addPortfolio" exact>
              <div className="navbar-item">Create</div>
            </NavLink>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              {}
              <div className="buttons">
                {!token ? (
                  <Fragment>
                    <div
                      className="button is-primary"
                      onClick={() => {
                        setShowModal(!showModal);
                        setIsSignUp(true);
                      }}
                    >
                      <strong>Sign up</strong>
                    </div>
                    <div
                      className="button is-light"
                      onClick={() => {
                        setShowModal(!showModal);
                        setIsSignUp(false);
                      }}
                    >
                      Log in
                    </div>
                  </Fragment>
                ) : (
                  <div
                    className="button is-danger"
                    onClick={() => {
                      auth.logout();
                    }}
                  >
                    <strong>Logout</strong>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div class={`modal ${isModalActive()}`}>
        <div class="modal-background" onClick={() => setShowModal(false)}></div>
        <div class="modal-content">
          <Auth isSignUp={isSignUp} />
        </div>
        <button
          class="modal-close is-large"
          aria-label="close"
          onClick={() => setShowModal(!showModal)}
        ></button>
      </div>
    </Fragment>
  );
};

export default NavBar;
