import React, { useState } from "react";
import { Card } from "antd";
import ReactEcharts from "echarts-for-react";
import { calculator } from "../js/calculator";

const BiasChart = ({ props }) => {
  let arrayX = [];
  let arrayY = [];
  let valueQ = 0;
  let bias = 0;

  for (let i = 0; i <= props.n; i++) {
    let valuesResult = calculator(props.n, i, props.p);
    arrayY.push(valuesResult);
    arrayX.push(i);
  }

  if (props.q == 0) {
    valueQ = Number(1 - props.p).toFixed(4);
  } else {
    valueQ = props.q;
  }

  bias = Number(
    3 + (1 - 6 * props.p * props.q) / Math.sqrt(props.N * props.p * props.q)
  ).toFixed(4);

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
        type: "line",
        smooth: true,
      },
    ],
  };

  return (
    <Card title="Sesgo" bordered={false}>
      <ReactEcharts option={option} />
    </Card>
  );
};

export default BiasChart;
