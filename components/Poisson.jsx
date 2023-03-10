import { Button, Checkbox, Col, Input, Row } from "antd";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import PoissonCalculator from "./PoissonCalculator";
import PoissonChart from "./PoissonChart";

const style = {
  background: "#0092ff",
  padding: "8px 0",
};

const Poisson = () => {
  const [checkApproach, setCheckApproach] = useState(false);
  const [data, setData] = useState({
    numberX: 0,
    probability: 0,
    valueQ: 0,
    sample: 0,
    half: 0,
  });

  const onApproach = () => {
    setCheckApproach(!checkApproach);
    console.log("aproximacion");
  };

  const handlChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };
  return (
    <>
      <Row gutter={[16, 24]}>
        <div className={styles.container}>
          <Col className="gutter-row" span="all">
            <Checkbox onChange={onApproach}>Aproximación</Checkbox>
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={24}>
                <label>
                  x1 (número de intentos)
                  <Input
                    type="number"
                    id="numberX"
                    value={data.numberX}
                    onChange={(e) => handlChange(e.target.id, e.target.value)}
                  />
                </label>
              </Col>
            </Row>
            <br />
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={24}>
                <label>
                  p (probabilidad de que pase)
                  <Input
                    type="number"
                    id="probability"
                    value={data.probability}
                    onChange={(e) => handlChange(e.target.id, e.target.value)}
                  />
                  {}
                </label>
                <div hidden={!checkApproach}>
                  <label>
                    q (probabilidad fracaso)
                    <Input
                      type="number"
                      id="valueQ"
                      value={data.valueQ}
                      onChange={(e) => handlChange(e.target.id, e.target.value)}
                    />
                  </label>
                </div>
              </Col>
            </Row>
            <br />
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={24}>
                <label>
                  n (muestra)
                  <Input
                    type="number"
                    id="sample"
                    value={data.sample}
                    onChange={(e) => handlChange(e.target.id, e.target.value)}
                  />
                </label>
              </Col>
            </Row>
            <br />
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={24}>
                <label>
                  Media
                  <Input
                    type="number"
                    id="half"
                    value={data.half}
                    onChange={(e) => handlChange(e.target.id, e.target.value)}
                  />
                </label>
              </Col>
            </Row>
            <br />
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={24}>
                <label>
                  <PoissonCalculator props={data} />
                </label>
              </Col>
            </Row>
          </Col>
        </div>
        <Col className="gutter-row" span={14}>
          <PoissonChart props={data} />
        </Col>
      </Row>
    </>
  );
};

export default Poisson;
