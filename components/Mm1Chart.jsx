import React from "react";
import { Card } from "antd";
import ReactEcharts from "echarts-for-react";

const Mm1Chart = ({ props }) => {
  let arrayX = [];
  let arrayY = [];
  let internalProbabilityN = 0;

  for (let i = 0; i <= 10; i++) {
    internalProbabilityN =
    Number(1 - Number(props.halfService / props.averageArrival)) *
    Number(
      Math.pow(Number(props.halfService / props.averageArrival), Number(i))
    );
    arrayY.push(internalProbabilityN);
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

export default Mm1Chart;
