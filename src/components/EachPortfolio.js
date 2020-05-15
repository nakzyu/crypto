import React from "react";
import { handleDollar } from "../utils/handleNumber";
import { useSelector } from "react-redux";
import Chart from "./Chart";

// selected,id,creator,title,amount,date

const EachPortfolio = ({ selected, id, creator, title, amount, date }) => {
  const latestP = useSelector((state) => state.latestP);

  return (
    <div class="box">
      <article class="media">
        <div class="media-content is-flex">
          <div class="content">
            <p>
              <strong>{title}</strong> <small>{date}</small>
              <br />
              amount: ${handleDollar(amount)}
              {selected.map((item) => (
                <div>
                  {item.name} changed={item.priceUsd / latestP[item.id]}
                </div>
              ))}
            </p>
          </div>
          <div className="chart">
            <Chart selected={selected} isInMyP={true} />
          </div>
        </div>
      </article>
    </div>
  );
};

export default EachPortfolio;
