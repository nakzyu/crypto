import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const chart = () => {
  const options = {
    chart: {
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
      },
    },
    title: {
      text: "Contents of Highsoft's weekly fruit delivery",
    },
    subtitle: {
      text: "3D donut in Highcharts",
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
        data: [
          { name: "banana", y: 61 },
          { name: "kao", y: 5 },
          { name: "d", y: 20 },
          { name: "sha", y: 21 },
        ],
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
