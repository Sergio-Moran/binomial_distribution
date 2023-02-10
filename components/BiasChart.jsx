import React, { useState } from "react";
import { Card } from "antd";
import ReactEcharts from "echarts-for-react";
import { calculator } from "../js/calculator";

const BiasChart = ({ props }) => {
  let arrayX = [];
  let arrayY = [];
  let valueQ = 0;
  let valueP = 0;
  let bias = 0;

  if (props.p == 0) {
    valueP = Number(1 - props.q).toFixed(7);
    valueQ = props.q;
  } else if (props.q == 0) {
    valueQ = Number(1 - props.p).toFixed(7);
    valueP = props.p;
  } else {
    valueQ = props.q;
    valueP = props.p;
  }

  for (let i = 0; i <= props.n; i++) {
    let valuesResult = calculator(props.n, i, valueP);
    arrayY.push(valuesResult);
    arrayX.push(i);
  }

  bias = Number(
    3 + (1 - 6 * valueP * valueQ) / Math.sqrt(props.N * valueP * valueQ)
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
