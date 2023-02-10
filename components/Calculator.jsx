import React, { useState } from "react";
import { Button, Col, Row } from "antd";
import Cards from "./Cards";
import { maths } from "../js/calculator";

const Calculator = ({ props, check, checkPoblation }) => {
  const [size, setSize] = useState("large");
  const [result, setResult] = useState();
  const [resultPoblation, setResultPoblation] = useState();
  const [results, setResults] = useState();
  const [flag, setFlag] = useState("");

  const onMath = () => {
    let statisticalData = maths(
      props.N,
      props.n,
      props.x,
      props.xn,
      props.p,
      props.q,
      checkPoblation,
      check
    );
    setResultPoblation(statisticalData.resultPoblation);
    setResults(statisticalData.valuesResult);
    setResult(statisticalData.total);
    setFlag(statisticalData.flag);
  };

  return (
    <>
      <Button type="primary" size={size} onClick={onMath}>
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
