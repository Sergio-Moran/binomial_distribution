import React, { useState } from "react";
import { Button, Col, Row } from "antd";
import Cards from "./Cards";
import { mm1 } from "../js/mm1";

const Mm1Calculator = ({ props, checkMin1, checkMin2, checkTMin, checkPoblation }) => {
  const [size, setSize] = useState("large");
  const [result, setResult] = useState();
  const [flag, setFlag] = useState();

  const onMath = () => {
    try {
      let results = mm1(
        Number(props.halfService),
        Number(props.averageArrival),
        Number(props.ws),
        Number(props.wq),
        Number(props.ls),
        Number(props.lq),
        Number(props.poblation),
        Number(props.time),
        checkMin1,
        checkMin2,
        checkTMin,
        checkPoblation
      );
      setResult(results);
      setFlag(results.flag);
    } catch (error) {
      /* console.log(error); */
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

export default Mm1Calculator;
