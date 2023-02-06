import React from "react";
import { Card } from "antd";
import ReactEcharts from "echarts-for-react";

const Chart = ({ props }) => {
  let arrayX = [];
  let arrayY = [];

  const factorial = (num) => {
    if (num < 0) return -1;
    else if (num == 0) return 1;
    else {
      return num * factorial(num - 1);
    }
  };

  const calculator = (n, x, p) => {
    let numerator = factorial(n);
    let nLessX = factorial(Number(n - x));
    let xFactorial = factorial(x);
    let denominator = Number(nLessX * xFactorial).toFixed(4);
    let probability = Number(
      (numerator / denominator) * Math.pow(p, x) * Math.pow(1 - p, n - x)
    ).toFixed(4);
    return probability;
  };

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
    <Card title="?" bordered={false}>
      <ReactEcharts option={option} />
    </Card>
  );
};

export default Chart;
