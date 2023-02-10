import React from "react";
import { Card } from "antd";

const Cards = ({ result, flag, results, resultPoblation }) => {
  if (flag == "") {
    return <Card title="Resultado" bordered={false}></Card>;
  } else if (flag == "1") {
    return (
      <Card title="Resultado" bordered={false}>
        La probabilidad es de: {result} ó del {Number(result * 100).toFixed(2)}%
      </Card>
    );
  } else if (flag == "2") {
    let formatter = "";
    results.forEach((e) => {
      formatter += " " + e + " - ";
    });
    return (
      <Card title="Resultado" bordered={false}>
        La probabilidad de : {formatter}
        <br />
        Dando un resultado de {result}
        <br />ó del {Number(result * 100)}%
      </Card>
    );
  } else if (flag == "3") {
    let formatter = "";
    results.forEach((e) => {
      formatter += " " + e + " - ";
    });
    return (
      <Card title="Resultado" bordered={false}>
        La probabilidad de : {formatter}
        <br />
        Dando un resultado de {result}
        <br />ó del {Number(result * 100).toFixed(2)}% Media de : {resultPoblation.half}
        <br />
        Factor de correacción : {resultPoblation.correctionFactor}
        <br />
        Desviación : {resultPoblation.deviation}
        <br />
        Curtosis : {resultPoblation.kurtosis}
        <br />
        Sesgo : {resultPoblation.bia}
        <br />
      </Card>
    );
  } else if (flag == "4") {
    return (
      <Card title="Resultado" bordered={false}>
        La probabilidad es de: {result} ó del {Number(result * 100).toFixed(2)}%
        <br />
        Media de : {resultPoblation.half}
        <br />
        Factor de corrección : {resultPoblation.correctionFactor}
        <br />
        Desviación : {resultPoblation.deviation}
        <br />
        Curtosis : {resultPoblation.kurtosis}
        <br />
        Sesgo : {resultPoblation.bia}
        <br />
      </Card>
    );
  }
};

export default Cards;
