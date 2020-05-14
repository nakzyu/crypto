import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Main from "./pages/Main";
import AddPortfolio from "./pages/AddPortfolio";
import Coin from "./pages/Coin";
import MyPortfolios from "./pages/MyPortfolios";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default App;
