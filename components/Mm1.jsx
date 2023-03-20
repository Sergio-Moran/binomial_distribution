import { Checkbox, Col, Input, Row } from "antd";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import Mm1Calculator from "./Mm1Calculator";

const style = {
  background: "#0092ff",
  padding: "8px 0",
};

const Mm1 = () => {
  const [min, setMin] = useState(false);
  const [poblation, setPoblation] = useState(false);
  const [data, setData] = useState({
    halfService: 0,
    averageArrival: 0,
    ws: 0,
    wq: 0,
    ls: 0,
    lq: 0,
    poblation: 0,
  });
  let typePoblation = true;

  const onMin = () => {
    setMin(!min);
  };

  const onPoblation = () => {
    setPoblation(!poblation);
  };

  const handlChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  if (poblation) {
    typePoblation = false;
  }

  const normal = (
    <>
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" span={24}>
          <label>
            Media de Servicio
            <Input
              type="number"
              id="halfService"
              value={data.halfService}
              onChange={(e) => handlChange(e.target.id, e.target.value)}
            />
          </label>
        </Col>
      </Row>
      <br />
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" span={24}>
          <label>
            Media de Llegada
            <Input
              type="number"
              id="averageArrival"
              value={data.averageArrival}
              onChange={(e) => handlChange(e.target.id, e.target.value)}
            />
          </label>
        </Col>
      </Row>
      <br />
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" span={24}>
          <label>
            Ws (promedio en el sistema)
            <Input
              type="number"
              id="ws"
              value={data.ws}
              onChange={(e) => handlChange(e.target.id, e.target.value)}
            />
          </label>
        </Col>
      </Row>
      <br />
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" span={24}>
          <label>
            Wq (promedio de espera en cola)
            <Input
              type="number"
              id="wq"
              value={data.wq}
              onChange={(e) => handlChange(e.target.id, e.target.value)}
            />
          </label>
        </Col>
      </Row>
      <br />
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" span={24}>
          <label>
            Ls (número medio de clientes en el sistema)
            <Input
              type="number"
              id="ls"
              value={data.ls}
              onChange={(e) => handlChange(e.target.id, e.target.value)}
            />
          </label>
        </Col>
      </Row>
      <br />
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" span={24}>
          <label>
            Lq (número medio de clientes en cola)
            <Input
              type="number"
              id="lq"
              value={data.lq}
              onChange={(e) => handlChange(e.target.id, e.target.value)}
            />
          </label>
        </Col>
      </Row>
      <br />
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" span={24}>
          <label>
            Poblacion
            <Input
              type="number"
              id="poblation"
              value={data.lq}
              onChange={(e) => handlChange(e.target.id, e.target.value)}
            />
          </label>
        </Col>
      </Row>
      <br />
    </>
  );

  const poblation0 = (
    <>
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" span={24}>
          <label>
            Probabilidad de Poblacion 0
            <Input
              type="number"
              id="poblation"
              value={data.halfService}
              onChange={(e) => handlChange(e.target.id, e.target.value)}
            />
          </label>
        </Col>
      </Row>
      <br />
    </>
  );

  return (
    <>
      <Row gutter={[16, 24]}>
        <div className={styles.container}>
          <Col className="gutter-row" span="all">
            <Checkbox onChange={onMin}>Minutos</Checkbox>
            <Checkbox onChange={onPoblation}>Poblacion 0</Checkbox>
            {typePoblation ? normal : poblation0}
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={24}>
                <label>
                  <Mm1Calculator
                    props={data}
                    checkMin={min}
                    checkPoblation={poblation}
                  />
                </label>
              </Col>
            </Row>
          </Col>
        </div>
      </Row>
    </>
  );
};

export default Mm1;
