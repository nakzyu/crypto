import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Main from "./pages/Main";
import AddPortfolio from "./pages/AddPortfolio";

import MyPortfolios from "./pages/MyPortfolios";
import NavBar from "./components/NavBar";
import { useSelector } from "react-redux";

const App = () => {
  const token = useSelector((state) => state.auth.token);

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <NavBar />
          <Main />
        </Route>
        <Route path="/addPortfolio" exact>
          <NavBar />
          <AddPortfolio />
        </Route>
        <Route path="/myPortfolios/" exact>
          <NavBar />
          <MyPortfolios />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <NavBar />
          <Main />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return <BrowserRouter>{routes}</BrowserRouter>;
};

export default App;
