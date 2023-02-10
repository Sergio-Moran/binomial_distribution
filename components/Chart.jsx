import React from "react";
import { Card } from "antd";
import ReactEcharts from "echarts-for-react";
import { calculator } from "../js/calculator";

const Chart = ({ props }) => {
  let arrayX = [];
  let arrayY = [];

  for (let i = 0; i <= props.n; i++) {
    let valuesResult = calculator(props.n, i, props.p);
    arrayY.push(valuesResult);
    arrayX.push(i);
  }

  // Create the echarts instance
  const option = {
    xAxis: {
      type: "category",
      data: arrayX,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: arrayY,
        type: "bar",
        smooth: true,
      },
    ],
  };

  return (
    <Card title="Distribución Binomial" bordered={false}>
      <ReactEcharts option={option} />
    </Card>
  );
};

export default Chart;
