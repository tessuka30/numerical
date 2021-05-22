import Desmos from "desmos";
import { useEffect, useState } from "react";
import { addStyles, EditableMathField } from "react-mathquill";
import { InputNumber, Button, Table } from "antd";
const math = require("mathjs");
const AlgebraLatex = require("algebra-latex");
const columns = [
  {
    title: "iteration",
    dataIndex: "iteration",
    key: "iteration",
  },
  {
    title: "x",
    dataIndex: "x",
    key: "x",
  },
  {
    title: "error",
    dataIndex: "err",
    key: "err",
  },
];
addStyles();
function Onepoint() {
  const [latex, setLatex] = useState("");
  const [x, setx] = useState("");
  const [sh, setshow] = useState([]);
  useEffect(() => {
    var elt = document.getElementById("calculator");
    var calculator = Desmos.GraphingCalculator(elt, { expressions: false });
    calculator.setExpression({ id: "graph1", latex });
    //calculator.setExpression({ id: "graph2", latex: `${xL} < x < ${xR}` });
    document.getElementsByClassName(
      "dcg-graphpaper-branding"
    )[0].style.display = "none";
    return () => calculator.destroy();
  });
  async function example() {
    let x = await fetch("http://localhost:5000/Onepoint").then((res) =>
      res.json()
    );
    setLatex(x.fx);
    setx(x.x0);
  }
  function cal() {
    var err = Infinity;
    var dataSource = [];
    var count = 1;
    var xold = Number(x);
    while (err > 0.000001) {
      var xnew = math.evaluate(new AlgebraLatex().parseLatex(latex).toMath(), {
        x: xold,
      });
      console.log(xnew);
      dataSource.push({
        key: count,
        iteration: count,
        x: xnew,
      });
      err = Math.abs((xnew - xold) / xnew);
      xold = xnew;
      dataSource[count - 1] = { ...dataSource[count - 1], err };
      count++;
    }
    console.log(dataSource);
    setshow(<Table dataSource={dataSource} columns={columns} />);
  }
  return (
    <div>
      <div style={{ display: "flex" }}>
        <h1 style={{ marginRight: 10 }}>f(x)</h1>
        <EditableMathField
          style={{ width: 300, height: 30 }}
          latex={latex}
          onChange={(mathField) => {
            setLatex(mathField.latex());
          }}
        />
      </div>
      <div style={{ display: "flex" }}>
        <h1 style={{ marginRight: 10 }}>x0</h1>
        <InputNumber
          style={{ marginRight: 10 }}
          onChange={(value) => {
            setx(value);
          }}
          value={x}
        />
      </div>
      <Button type="primary" onClick={cal}>
        Submit
      </Button>
      <Button type="primary" onClick={example}>
        Example
      </Button>
      <div id="calculator" style={{ width: 600, height: 300 }}></div>
      {sh}
    </div>
  );
}
export default Onepoint;
