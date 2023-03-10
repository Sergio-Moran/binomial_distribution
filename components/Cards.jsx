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
        Suma de las probabilidades {result}
        <br />ó del {Number(result * 100).toFixed(2)}%
        <br />
        La resta con 1 es de {Number(1 - result).toFixed(7)}
        <br />ó del {Number((1 - result) * 100)}%
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
        Dando un resultado de {result}ó del {Number(result * 100).toFixed(2)}%
        <br />
        La resta con 1 es de {Number(1 - result).toFixed(7)}
        <br />ó del {Number((1 - result) * 100)}%
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
  } else if (flag == "5") {
    return (
      <Card title="Resultado" bordered={false}>
        La probabilidad por el metodo binomial es de:{" "}
        <b>{results.binomialProbability}</b> ó del{" "}
        <b>{Number(results.binomialProbability * 100).toFixed(2)}%</b>
        <br />
        La probabilidad por el metodo hipergeometrico es de:
        <br />
        <b>{results.hypergeometricProbability}</b> ó del{" "}
        <b>{Number(results.hypergeometricProbability * 100).toFixed(2)}%</b>
        <br />
        Curtosis : {results.kurtosis}{" "}
        <b>
          {results.kurtosis < 0
            ? "PLATICÚRTICA"
            : results.kurtosis == 0
            ? "MESOCÚRTICA"
            : "LEPTOCÚRTICA"}
        </b>
        <br />
        Sesgo : {results.bia}
      </Card>
    );
  } else if (flag == "6") {
    return (
      <Card title="Resultado" bordered={false}>
        La probabilidad es de <b>{Number(result.probability).toFixed(4)}</b> ó
        del <b>{Number(result.probability * 100).toFixed(2)}%</b>
        <br />
        La Desviación es de: <b>{Number(result.deviation).toFixed(4)}</b>
        <br />
        Curtosis : {Number(result.kurtosis).toFixed(4)}{" "}
        <b>
          {result.kurtosis < 0
            ? "PLATICÚRTICA"
            : result.kurtosis == 0
            ? "MESOCÚRTICA"
            : "LEPTOCÚRTICA"}
        </b>
        <br />
        Sesgo : {Number(result.bias).toFixed(4)}
      </Card>
    );
  } else if (flag == "7") {
    return (
      <Card title="Resultado" bordered={false}>
        La suma de las probabilidad es de{" "}
        <b>{Number(result.probability).toFixed(4)}</b> ó del{" "}
        <b>{Number(result.probability * 100).toFixed(2)}%</b>
        <br />
        Uno menos la probabilidad es de{" "}
        <b>{Number(1 - result.probability).toFixed(4)}</b> ó del{" "}
        <b>{Number((1 - result.probability) * 100).toFixed(2)}%</b>
      </Card>
    );
  } else if (flag == "8") {
    return (
      <Card title="Resultado" bordered={false}>
        La suma de las probabilidad es de{" "}
        <b>{Number(result.probability).toFixed(4)}</b> ó del{" "}
        <b>{Number(result.probability * 100).toFixed(2)}%</b>
        <br />
        Uno menos la probabilidad es de{" "}
        <b>{Number(1 - result.probability).toFixed(4)}</b> ó del{" "}
        <b>{Number((1 - result.probability) * 100).toFixed(2)}%</b>
      </Card>
    );
  }
};

export default Cards;
