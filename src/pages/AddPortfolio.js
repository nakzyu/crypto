import React, { Fragment } from "react";
import SearchBar from "../components/SearchBar";
import Chart from "../components/Chart";
import { useSelector } from "react-redux";

const AddPortfolio = () => {
  const selected = useSelector((state) => state.portfolioForm.selected);

  return (
    <Fragment>
      <SearchBar />
      <Chart selected={selected} />
    </Fragment>
  );
};

export default AddPortfolio;
