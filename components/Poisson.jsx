import { Button, Checkbox, Col, Input, Row } from "antd";
import React, { useState } from "react";
import { poisson } from "../js/poisson";
import styles from "../styles/Home.module.css";

const style = {
  background: "#0092ff",
  padding: "8px 0",
};

const Poisson = () => {
  const [data, setData] = useState({
    lambda: 0,
    numberX: 0,
    propability: 0,
    sample: 0,
    half: 0,
  });

  const handlChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  poisson();
  return (
    <>
      <Row gutter={[16, 24]}>
        <div className={styles.container}>
          <Col className="gutter-row" span="all">
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={24}>
                <label>
                  <br />
                  λ (Lambda)
                  <Input
                    type="number"
                    id="lambda"
                    value={data.lambda}
                    onChange={(e) => handlChange(e.target.id, e.target.value)}
                  />
                </label>
              </Col>
            </Row>
            <br />
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
                    id="propability"
                    value={data.propability}
                    onChange={(e) => handlChange(e.target.id, e.target.value)}
                  />
                  {}
                </label>
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
                  {/* <Calculator
                      props={data}
                      check={check}
                      checkPoblation={checkPoblation}
                      checkK={variableK}
                      approach={checkApproach}
                      lots={checkLots}
                    /> */}
                </label>
              </Col>
            </Row>
          </Col>
        </div>

        <Col className="gutter-row" span={14}>
          {/* <Chart props={data} checkK={variableK} />
            <br />
            <div hidden={!checkPoblation}>
              <BiasChart props={data} checkK={variableK} />
            </div>
            <br />
            <div hidden={!checkLots}>
              <TableComponent props={data} />
            </div> */}
        </Col>
      </Row>
    </>
  );
};

export default Poisson;
