import React, { useState } from "react";
import { Button, Col, Row } from "antd";
import Cards from "./Cards";

const Calculator = ({ props, check, checkPoblation }) => {
  const [size, setSize] = useState("large");
  const [result, setResult] = useState();
  const [resultPoblation, setResultPoblation] = useState();
  const [results, setResults] = useState();
  const [flag, setFlag] = useState("");

  const maths = () => {
    let valuesResult;
    let total = 0;
    let valueQ = 0;

    if (props.q == 0) {
      valueQ = Number(1 - props.p).toFixed(4);
    } else {
      valueQ = props.q;
    }

    if (checkPoblation && check) {
      if (props.x == props.xn) {
        return alert("x1 y x2 son iguales, colocar otro intervalo");
      }
      valuesResult = calculatorPoblation(props.n, props.p, props.N, valueQ);
      setResultPoblation(valuesResult);
      if (props.x == 0) {
        valuesResult = calculators(0, props.xn, props.n, props.p);
        valuesResult.forEach((e) => {
          total += Number(e);
        });
      } else if (props.x > props.xn) {
        valuesResult = calculators(props.xn, props.x, props.n, props.p);
        valuesResult.forEach((e) => {
          total += Number(e);
        });
      } else if (props.x < props.xn) {
        valuesResult = calculators(props.x, props.xn, props.n, props.p);
        valuesResult.forEach((e) => {
          total += Number(e);
        });
      }
      setFlag("3");
      setResult(total);
      setResults(valuesResult);
    }

    if (checkPoblation && !check) {
      valuesResult = calculatorPoblation(props.n, props.p, props.N, valueQ);
      setResultPoblation(valuesResult);
      valuesResult = calculator(props.n, props.x, props.p);
      setResult(valuesResult);
      setFlag("4");
    }

    if (!checkPoblation && check) {
      if (props.x == props.xn) {
        return alert("x1 y x2 son iguales, colocar otro intervalo");
      }
      if (props.x == 0) {
        valuesResult = calculators(0, props.xn, props.n, props.p);
        valuesResult.forEach((e) => {
          total += Number(e);
        });
      } else if (props.x > props.xn) {
        valuesResult = calculators(props.xn, props.x, props.n, props.p);
        valuesResult.forEach((e) => {
          total += Number(e);
        });
      } else if (props.x < props.xn) {
        valuesResult = calculators(props.x, props.xn, props.n, props.p);
        valuesResult.forEach((e) => {
          total += Number(e);
        });
      }
      setFlag("2");
      setResult(total);
      setResults(valuesResult);
    }

    if (!check && !checkPoblation) {
      valuesResult = calculator(props.n, props.x, props.p);
      setResult(valuesResult);
      setFlag("1");
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

  const calculators = (x, xn, n, p) => {
    let values = [];
    let numerator = 0;
    let nLessX = 0;
    let xFactorial = 0;
    let denominator = 0;
    let probability = 0;
    for (var i = x; i <= xn; i++) {
      numerator = factorial(n);
      nLessX = factorial(Number(n - i));
      xFactorial = factorial(i);
      denominator = Number(nLessX * xFactorial).toFixed(4);
      probability = Number(
        (numerator / denominator) * Math.pow(p, i) * Math.pow(1 - p, n - i)
      ).toFixed(4);
      values.push(probability);
    }
    return values;
  };

  const calculatorPoblation = (n, p, N, q) => {
    let half = 0;
    let correctionFactor = 0;
    let deviation = 0;
    let kurtosis = 0;
    let bias = 0;
    half = Number(n * p).toFixed(4);
    correctionFactor = Math.sqrt(
      Number(N - props.n).toFixed(4) / Number(N - 1).toFixed(4)
    ).toFixed(4);
    deviation = Number(correctionFactor * Math.sqrt(Number(n * p * q))).toFixed(
      4
    );
    kurtosis = Number(Number(q - p) / Number(Math.sqrt(n * p * q))).toFixed(4);
    bias = Number(3 + (1 - 6 * p * q) / Math.sqrt(N * p * q)).toFixed(4);
    const resultPoblation = {
      half: half,
      correctionFactor: correctionFactor,
      deviation: deviation,
      kurtosis: kurtosis,
      bia: bias,
    };

    return resultPoblation;
  };

  const factorial = (num) => {
    if (num < 0) return -1;
    else if (num == 0) return 1;
    else {
      return num * factorial(num - 1);
    }
  };
  return (
    <>
      <Button type="primary" size={size} onClick={maths}>
        Calcular
      </Button>
      <div>
        <br />
        <Cards
          result={result}
          flag={flag}
          results={results}
          resultPoblation={resultPoblation}
        />
      </div>
    </>
  );
};

export default Calculator;
