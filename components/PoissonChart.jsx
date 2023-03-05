import React from "react";
import { Card } from "antd";
import ReactEcharts from "echarts-for-react";
import { tablePoissonChart } from "../js/poisson";

const PoissonChart = ({ props }) => {
  let arrayX = [];
  let arrayY = [];

  for (let i = 0; i <= props.numberX; i++) {
    let valuesResult = tablePoissonChart(
      props.lambda,
      i,
      props.probability,
      props.sample,
      props.half
    );
    console.log(valuesResult);
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
        type: "line",
        smooth: true,
      },
    ],
  };
  return (
    <Card title={"Distribución por Poisson:"} bordered={false}>
      <ReactEcharts option={option} />
    </Card>
  );
};

export default PoissonChart;
