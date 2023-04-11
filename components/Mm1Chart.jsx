import React from "react";
import { Card } from "antd";
import ReactEcharts from "echarts-for-react";

const Mm1Chart = ({ props, checkMin1, checkMin2 }) => {
  let arrayX = [];
  let arrayY = [];
  let internalProbabilityN = 0;
  let internalHalfService = 0;
  let internalAverageArrival = 0;
  let index = props.poblation == 0 ? 10 : props.poblation;

  if (checkMin1) {
    internalHalfService = Number(props.halfService / 60);
  } else {
    internalHalfService = Number(props.halfService);
  }

  if (checkMin2) {
    internalAverageArrival = Number(props.averageArrival / 60);
  } else {
    internalAverageArrival = Number(props.averageArrival);
  }

  if (internalHalfService > internalAverageArrival) {
  } else {
    for (let i = 0; i <= index; i++) {
      internalProbabilityN =
        Number(1 - Number(props.halfService / props.averageArrival)) *
        Number(
          Math.pow(Number(props.halfService / props.averageArrival), Number(i))
        );
      arrayY.push(internalProbabilityN);
      arrayX.push(i);
    }
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
    <Card title={"Distribución MM1:"} bordered={false}>
      <ReactEcharts option={option} />
    </Card>
  );
};

export default Mm1Chart;
