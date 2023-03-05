import React, { useState } from "react";
import { Button, Col, Row } from "antd";
import Cards from "./Cards";
import { poisson } from "../js/poisson";

const PoissonCalculator = ({ props }) => {
  const [size, setSize] = useState("large");
  const [result, setResult] = useState();
  const [flag, setFlag] = useState();
  const onMath = () => {
    try {
      let results = poisson(
        Number(props.lambda),
        Number(props.numberX),
        Number(props.probability),
        Number(props.sample),
        Number(props.half)
      );
      setResult(results);
      setFlag(results.flag);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button type="primary" size={size} onClick={onMath}>
        Calcular
      </Button>
      <div>
        <br />
        <Cards result={result} flag={flag} />
      </div>
    </>
  );
};

export default PoissonCalculator;
