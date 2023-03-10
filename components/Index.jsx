import { Button, Checkbox, Col, Input, Row } from "antd";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import BiasChart from "./BiasChart";
import BinomialDistribution from "./BinomialDistribution";
import Calculator from "./Calculator";
import Chart from "./Chart";
import Poisson from "./Poisson";
import TableComponent from "./TableComponent";

const style = {
  background: "#0092ff",
  padding: "8px 0",
};

const Index = () => {
  const [poisson, setPoisson] = useState(false);
  let poissonVariable = false;

  const onPoisson = () => {
    setPoisson(!poisson);
  };

  if (poisson) {
    poissonVariable = true;
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

  return (
    <div className={styles.container}>
      <Checkbox onChange={onPoisson}>Poisson</Checkbox>
      {poissonVariable ? poison : binomial}
    </div>
  );
};

export default Index;
