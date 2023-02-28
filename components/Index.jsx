import { Button, Checkbox, Col, Input, Row } from "antd";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import BiasChart from "./BiasChart";
import Calculator from "./Calculator";
import Chart from "./Chart";
import TableComponent from "./TableComponent";

const style = {
  background: "#0092ff",
  padding: "8px 0",
};

const Index = () => {
  const [check, setCheck] = useState(false);
  const [checkApproach, setCheckApproach] = useState(false);
  const [checkLots, setCheckLots] = useState(false);
  const [checkPoblation, setCheckPoblation] = useState(false);
  const [data, setData] = useState({
    N: 0,
    n: 0,
    T: 0,
    x: 0,
    xn: 0,
    p: 0,
    q: 0,
    k: 0,
  });
  let variableK = false;

  const handlChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const onChange = () => {
    setCheck(!check);
    if (check) {
      setData({
        N: data.N,
        n: data.n,
        x: data.x,
        xn: "",
        p: data.p,
        q: data.q,
        k: data.k,
      });
    }
  };

  const onPoblation = () => {
    setCheckPoblation(!checkPoblation);
    if (checkPoblation) {
      setData({
        N: 0,
        n: data.n,
        x: data.x,
        xn: data.xn,
        p: data.p,
        q: data.q,
        k: data.k,
      });
    }
  };

  const onApproach = () => {
    setCheckApproach(!checkApproach);
    if (checkApproach) {
      setData({
        N: data.N,
        n: data.n,
        x: data.x,
        xn: data.xn,
        p: data.p,
        q: data.q,
        k: data.k,
      });
    }
  };

  const onLots = () => {
    setCheckLots(!checkLots);
  };

  const clear = () => {
    setData({ N: "", n: "", x: "", xn: "", p: "", q: "", k: "" });
  };

  if (checkPoblation) {
    let result = Number((data.n * 100) / data.N).toFixed(2);
    if (result > 20) {
      variableK = true;
    } else {
      variableK = false;
    }
  }

  const kInduvidual = (
    <>
      <br />
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" span={24}>
          <label>
            k (n individuos que...)
            <Input
              type="number"
              id="k"
              value={data.k}
              onChange={(e) => handlChange(e.target.id, e.target.value)}
            />
          </label>
        </Col>
      </Row>
    </>
  );

  return (
    <>
      <Row gutter={[16, 24]}>
        <div className={styles.container}>
          <Col className="gutter-row" span="all">
            <Checkbox onChange={onChange}>Rango</Checkbox>
            <Checkbox onChange={onPoblation}>Población</Checkbox>
            <Checkbox onChange={onApproach}>Aproximación</Checkbox>
            <Button type="primary" onClick={clear}>
              Limpiar
            </Button>
            <div hidden={!check}>
              <Row gutter={[16, 24]}>
                <Col className="gutter-row" span="all">
                  <Checkbox onChange={onLots}>Lotes</Checkbox>
                </Col>
              </Row>
            </div>
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={24}>
                <div hidden={!checkPoblation}>
                  <label>
                    N (Población)
                    <Input
                      type="number"
                      id="N"
                      value={data.N}
                      onChange={(e) => handlChange(e.target.id, e.target.value)}
                    />
                  </label>
                </div>
                <label>
                  <br />
                  n (número de pruebas)
                  <Input
                    type="number"
                    id="n"
                    value={data.n}
                    onChange={(e) => handlChange(e.target.id, e.target.value)}
                  />
                </label>
              </Col>
            </Row>
            <br />
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={24}>
                <div hidden={!checkLots}>
                  <label>
                    Tolerancia
                    <Input
                      type="number"
                      id="T"
                      value={data.T}
                      onChange={(e) => handlChange(e.target.id, e.target.value)}
                    />
                  </label>
                </div>
                <label>
                  x1 (número de exitos)
                  <Input
                    type="number"
                    id="x"
                    value={data.x}
                    onChange={(e) => handlChange(e.target.id, e.target.value)}
                  />
                  <div hidden={!check}>
                    <label>
                      A x2 (número de exitos)
                      <Input
                        type="number"
                        id="xn"
                        value={data.xn}
                        onChange={(e) =>
                          handlChange(e.target.id, e.target.value)
                        }
                      />
                    </label>
                  </div>
                </label>
              </Col>
            </Row>
            <br />
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={24}>
                <label>
                  p (probabilidad de exito)
                  <Input
                    type="number"
                    id="p"
                    value={data.p}
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
                  q (probabilidad de fracaso)
                  <Input
                    type="number"
                    id="q"
                    value={data.q}
                    onChange={(e) => handlChange(e.target.id, e.target.value)}
                  />
                </label>
              </Col>
            </Row>
            {variableK ? kInduvidual : ""}
            <br />
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={24}>
                <label>
                  <Calculator
                    props={data}
                    check={check}
                    checkPoblation={checkPoblation}
                    checkK={variableK}
                    approach={checkApproach}
                    lots={checkLots}
                  />
                </label>
              </Col>
            </Row>
          </Col>
        </div>

        <Col className="gutter-row" span={14}>
          <Chart props={data} checkK={variableK} />
          <br />
          <div hidden={!checkPoblation}>
            <BiasChart props={data} checkK={variableK} />
          </div>
          <br />
          <div hidden={!checkLots}>
            <TableComponent props={data} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Index;
