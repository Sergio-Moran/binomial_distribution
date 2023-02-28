import React from "react";
import { Card, Row, Col, Table } from "antd";
import { calculator } from "../js/calculator";
import ReactEcharts from "echarts-for-react";

const TableComponent = ({ props }) => {
  let arrayX = [];
  let arrayY = [];
  let arrayEntry = [];
  let valueQ = 0;
  let valueP = 0;
  let aux = 0;
  let answer = "";
  let dataArray = [
    {
      key: Number,
      x: Number,
      px: Number,
      a: Number,
      pp: String,
      ap: String,
    },
  ];

  if (props.p == 0) {
    valueP = Number(1 - props.q).toFixed(7);
    valueQ = props.q;
  } else if (props.q == 0) {
    valueQ = Number(1 - props.p).toFixed(7);
    valueP = props.p;
  } else {
    valueQ = props.q;
    valueP = props.p;
  }

  for (let i = props.x; i <= props.xn; i++) {
    let key = i;
    let x = i;
    let valuesResult = calculator(props.n, i, valueP, valueQ);
    aux += Number(valuesResult.probability);
    if (Number(aux * 100).toFixed(2) <= Number(props.T)) {
      arrayEntry.push(x);
    }
    const response = {
      key: key,
      x: x,
      px: Number(valuesResult.probability).toFixed(2),
      a: Number(aux).toFixed(4),
      pp: Number(valuesResult.probability * 100).toFixed(2) + "%",
      ap: Number(aux * 100).toFixed(2) + "%",
    };
    arrayY.push(valuesResult.probability);
    arrayX.push(i);
    dataArray.push(response);
  }

  if (arrayEntry.length != 0) {
    const last = arrayEntry[arrayEntry.length - 1];
    answer = last;
  }

  const columns = [
    {
      title: "x",
      dataIndex: "x",
      key: "x",
    },
    {
      title: "P(x)",
      dataIndex: "px",
      key: "px",
    },
    {
      title: "A",
      dataIndex: "a",
      key: "a",
    },
    {
      title: "p%",
      dataIndex: "pp",
      key: "pp",
    },
    {
      title: "A%",
      dataIndex: "ap",
      key: "ap",
    },
  ];
  const data = dataArray;
  // Create the echarts instance
  const option = {
    xAxis: {
      type: "category",
      data: arrayX,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: arrayY,
        type: "bar",
        smooth: true,
      },
    ],
  };
  return (
    <>
      <br />
      <Row>
        <Col className="gutter-row" span={10}>
          <Card
            title={
              "La iteración para una tolerancia del: " + props.T + "%" + " es x: " + answer
            }
            bordered={false}
          >
            <Table columns={columns} dataSource={data} pagination={false} />
          </Card>
        </Col>
        <Col className="gutter-row" span={1} />
        <Col className="gutter-row" span={13}>
          <Card title={"Grafica de lote"} bordered={false}>
            <ReactEcharts option={option} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default TableComponent;
