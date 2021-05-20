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
    title: "xi+1",
    dataIndex: "xi+1",
    key: "xi+1",
  },
  {
    title: "xi",
    dataIndex: "xi",
    key: "xi",
  },
  {
    title: "error",
    dataIndex: "err",
    key: "err",
  },
];
addStyles();
function Secant() {
  const [latex, setLatex] = useState("");
  const [x0, setx0] = useState("");
  const [x1, setx1] = useState("");
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
  //   async function example() {
  //     let x = await fetch("http://localhost:5000/Bisection").then((res) =>
  //       res.json()
  //     );
  //     setLatex(x.fx);
  //     setx(x.x);
  //   }
  function cal() {
    var err = Infinity;
    var dataSource = [];
    var count = 1;
    var xold0 = Number(x0);
    var xold1 = Number(x1);
    while (err > 0.000001) {
      var fxold0 = math.evaluate(
        new AlgebraLatex().parseLatex(latex).toMath(),
        {
          x: xold0,
        }
      );
      var fxold1 = math.evaluate(
        new AlgebraLatex().parseLatex(latex).toMath(),
        {
          x: xold1,
        }
      );
      var xnew = xold1 - fxold1 * ((xold1 - xold0) / (fxold1 - fxold0));
      dataSource.push({
        key: count,
        iteration: count,
        "xi+1": xnew,
        xi: xold1,
      });
      err = Math.abs((xnew - xold1) / xnew);
      xold0 = xold1;
      xold1 = xnew;
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
            setx0(value);
          }}
          value={x0}
        />
        <h1 style={{ marginRight: 10 }}>x1</h1>
        <InputNumber
          style={{ marginRight: 10 }}
          onChange={(value) => {
            setx1(value);
          }}
          value={x1}
        />
      </div>
      <Button type="primary" onClick={cal}>
        Submit
      </Button>
      {/* <Button type="primary" onClick={example}>
        Example
      </Button> */}
      <div id="calculator" style={{ width: 600, height: 300 }}></div>
      {sh}
    </div>
  );
}
export default Secant;
