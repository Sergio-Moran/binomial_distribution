import { Button, Checkbox, Col, Input, Row } from "antd";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import BiasChart from "./BiasChart";
import BinomialDistribution from "./BinomialDistribution";
import Calculator from "./Calculator";
import Chart from "./Chart";
import Mm1 from "./Mm1";
import Poisson from "./Poisson";
import TableComponent from "./TableComponent";

const style = {
  background: "#0092ff",
  padding: "8px 0",
};

const Index = () => {
  const [poisson, setPoisson] = useState(false);
  const [mmOne, setMmOne] = useState(false);
  let poissonVariable = false;
  let mmOneVariable = false;
  let methodVariable = "";

  const onPoisson = () => {
    setPoisson(!poisson);
  };

  const onMm1 = () => {
    setMmOne(!mmOne);
  };

  if (poisson) {
    poissonVariable = true;
    mmOneVariable = false;
    methodVariable = "poisson";
  } else if (mmOne) {
    mmOneVariable = true;
    poissonVariable = false;
    methodVariable = "mm1";
  } else {
    methodVariable = "";
  }

  const binomial = (
    <>
      <Col className="gutter-row" span={14}>
        <BinomialDistribution />
      </Col>
    </>
  );

  const poison = (
    <>
      <Col className="gutter-row" span={14}>
        <Poisson />
      </Col>
    </>
  );

  const mm1 = (
    <>
      <Col className="gutter-row" span={14}>
        <Mm1 />
      </Col>
    </>
  );

  const method = () => {
    switch (methodVariable) {
      case "poisson":
        return poison;
        break;

      case "mm1":
        return mm1;
        break;

      case "":
        return binomial;
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      <Checkbox onChange={onPoisson}>Poisson</Checkbox>
      <Checkbox onChange={onMm1}>MM1</Checkbox>
      {method()}
      {/* {poissonVariable ? poison : binomial} */}
    </div>
  );
};

export default Index;
