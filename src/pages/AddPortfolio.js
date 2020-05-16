import React, { Fragment } from "react";
import PortfolioForm from "../components/PortfolioForm";
import Chart from "../components/Chart";
import { useSelector } from "react-redux";

const AddPortfolio = () => {
  const { selected, title } = useSelector((state) => state.portfolioForm);

  return (
    <Fragment>
      <PortfolioForm />
      <Chart selected={selected} title={title} />
    </Fragment>
  );
};

export default AddPortfolio;
