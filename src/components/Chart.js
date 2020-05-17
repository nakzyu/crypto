import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { handleDollar } from "../utils/handleNumber";

const chart = ({ selected, latestP, isInMyP, amount, title }) => {
  const data = [];

  const subtitle = () => {
    if (isInMyP) {
      return `total: $${handleDollar(total)} <br />bought at $${handleDollar(
        amount
      )}`;
    } else return `total: $${handleDollar(total)}`;
  };

  isInMyP
    ? selected.map((item) =>
        data.push({ name: item.name, y: item.qty * latestP[item.id] })
      )
    : selected.map((item) =>
        data.push({ name: item.name, y: item.qty * item.priceUsd })
      );

  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total += data[i].y;
  }

  const options = {
    chart: {
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
      },
    },
    title: {
      text: `${title}`,
    },
    subtitle: {
      text: subtitle(),
    },

    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        innerSize: 100,
        depth: 45,
      },
    },
    tooltip: {
      pointFormat: "<b>${point.y} ({point.percentage:.1f}% of total)</b>",
    },
    series: [
      {
        data: data,
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default chart;
