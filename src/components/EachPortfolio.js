import React from "react";
import { handleDollar, handlePercentChange } from "../utils/handleNumber";
import { useSelector } from "react-redux";
import Chart from "./Chart";
import "./EachPortfolio.css";

// selected,id,creator,title,amount,date

const EachPortfolio = ({
  selected,
  id,
  creator,
  title,
  amount,
  date,
  latestP,
}) => {
  return (
    <div class="box is-shadowless">
      <div className="field is-flex my-port">
        <div className="chart">
          <Chart
            selected={selected}
            amount={amount}
            isInMyP={true}
            latestP={latestP}
            title={title}
          />
        </div>
        <div className="table-container">
          <div className="is-size-4">
            Portfolio <div className="button is-danger is-small">delete</div>
          </div>
          <table className="table is-striped is-narrow is-hoverable is-fullwidth is-size-7-mobile">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {selected.map((item) => (
                <tr>
                  <td>{item.name}</td>
                  <td>
                    ${handleDollar(latestP[item.id])}
                    <br />
                    <small className="is-size-7 has-text-grey-light">
                      bought at ${handleDollar(item.priceUsd)}
                    </small>
                  </td>
                  <td>{item.qty}</td>
                  <td>
                    {((latestP[item.id] - item.priceUsd) / 100).toFixed(10)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EachPortfolio;
