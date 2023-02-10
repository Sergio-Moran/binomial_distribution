import React from "react";
import { Card } from "antd";

const Cards = ({ result, flag, results, resultPoblation }) => {
  if (flag == "") {
    return <Card title="Resultado" bordered={false}></Card>;
  } else if (flag == "1") {
    return (
      <Card title="Resultado" bordered={false}>
        La probabilidad es de: {result.probability} ó del{" "}
        {Number(result.probability * 100).toFixed(2)}%
        <br />
        Media de : {result.half}
        <br />
        Desviación : {result.deviation}
        <br />
        Curtosis : {result.kurtosis}{" "}
        {result.kurtosis < 0
          ? "PLATICÚRTICA"
          : result.kurtosis == 0
          ? "MESOCÚRTICA"
          : "LEPTOCÚRTICA"}
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
        <br />
        Media de : {resultPoblation.half}
        <br />
        Desviación : {resultPoblation.deviation}
        <br />
        Curtosis : {resultPoblation.kurtosis}
        {resultPoblation.kurtosis < 0
          ? "PLATICÚRTICA"
          : resultPoblation.kurtosis == 0
          ? "MESOCÚRTICA"
          : "LEPTOCÚRTICA"}
      </Card>
    );
  } else if (flag == "3") {
    let formatter = "";
    results.forEach((e) => {
      formatter += " " + e + " - ";
    });
    return (
      <Card title="Resultado" bordered={false}>
        Es una poblacion {resultPoblation.flagSample}
        <br />
        La probabilidad de : {formatter}
        <br />
        Dando un resultado de {result}
        <br />ó del {Number(result * 100).toFixed(2)}
        <br />% Media de : {resultPoblation.half}
        <br />
        Factor de corrección : {resultPoblation.correctionFactor}
        <br />
        Desviación : {resultPoblation.deviation}
        <br />
        Curtosis : {resultPoblation.kurtosis}{" "}
        {resultPoblation.kurtosis < 0
          ? "PLATICÚRTICA"
          : resultPoblation.kurtosis == 0
          ? "MESOCÚRTICA"
          : "LEPTOCÚRTICA"}
        <br />
        Sesgo : {resultPoblation.bia}
        <br />
      </Card>
    );
  } else if (flag == "4") {
    return (
      <Card title="Resultado" bordered={false}>
        Es una poblacion {resultPoblation.flagSample}
        <br />
        La probabilidad es de: {results} ó del{" "}
        {Number(results * 100).toFixed(2)}%
        <br />
        Media de : {resultPoblation.half}
        <br />
        Factor de corrección : {resultPoblation.correctionFactor}
        <br />
        Desviación : {resultPoblation.deviation}
        <br />
        Curtosis : {resultPoblation.kurtosis}{" "}
        {resultPoblation.kurtosis < 0
          ? "PLATICÚRTICA"
          : resultPoblation.kurtosis == 0
          ? "MESOCÚRTICA"
          : "LEPTOCÚRTICA"}
        <br />
        Sesgo : {resultPoblation.bia}
        <br />
      </Card>
    );
  }
};

export default Cards;
