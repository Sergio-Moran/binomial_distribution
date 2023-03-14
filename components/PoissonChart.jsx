import React from "react";
import { Card } from "antd";
import ReactEcharts from "echarts-for-react";
import { tablePoissonChart } from "../js/poisson";

const PoissonChart = ({ props, checkApproach }) => {
  let arrayX = [];
  let arrayY = [];
  let numberOne = checkApproach ? Number(props.numberX) : 0 ;
  let numberTwo = checkApproach ? Number(props.numberX2) : Number(props.numberX) ;

  for (let i = numberOne; i <= numberTwo; i++) {
    let valuesResult = tablePoissonChart(
      i,
      props.probability,
      props.sample,
      props.half
    );
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
