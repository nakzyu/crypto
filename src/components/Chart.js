import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { handleDollar } from "../utils/handleNumber";
import { useSelector } from "react-redux";

const chart = ({ selected, latestP, isInMyP, amount, title }) => {
  const data = [];

  isInMyP
    ? selected.map((item) =>
        data.push({ name: item.name, y: item.qty * latestP[item.id] })
      )
    : selected.map((item) =>
        data.push({ name: item.name, y: item.qty * item.priceUsd })
      );

  console.log(data);

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
      text: `total current amount: $${handleDollar(total)} was:${handleDollar(
        amount
      )}`,
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
