import React, { useState, Fragment, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import Auth from "./Auth";
import { useAuth } from "../hooks/auth-hook";
import { useSelector, useDispatch } from "react-redux";
import { setLatestP } from "../actions/Coin";
import { resetAuthForm } from "../actions/Auth";

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const auth = useAuth();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const isToggleActive = () => {
    if (toggle) return "is-active";
  };
  const isModalActive = () => {
    if (showModal) return "is-active";
  };

  useEffect(() => {
    if (!showModal) dispatch(resetAuthForm());
  }, [showModal, dispatch]);

  return (
    <Fragment>
      <nav className="navbar " role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <div className="navbar-item">
            <img src={require("../assets/crypto.png")} alt="dollar" />
            <div className="is-size-3 has-text-weight-bold ">crypto</div>
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
            {token && (
              <Fragment>
                <NavLink to="/myPortfolios" exact>
                  <div className="navbar-item">My Portfolios</div>
                </NavLink>
                <NavLink to="/addPortfolio" exact>
                  <div className="navbar-item">Create</div>
                </NavLink>
              </Fragment>
            )}
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
      {showModal && (
        <div class={`modal ${isModalActive()}`}>
          <div
            class="modal-background"
            onClick={() => setShowModal(false)}
          ></div>
          <div class="modal-content">
            <Auth isSignUp={isSignUp} setShowModal={setShowModal} />
          </div>
          <button
            class="modal-close is-large"
            aria-label="close"
            onClick={() => setShowModal(!showModal)}
          ></button>
        </div>
      )}
    </Fragment>
  );
};

export default NavBar;
