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
    title: "xL",
    dataIndex: "xL",
    key: "xL",
  },
  {
    title: "xR",
    dataIndex: "xR",
    key: "xR",
  },
  {
    title: "xM",
    dataIndex: "xM",
    key: "xM",
  },
  {
    title: "error",
    dataIndex: "err",
    key: "err",
  },
];
addStyles();
function Falseposition() {
  const [latex, setLatex] = useState("");
  const [xL, setxL] = useState("");
  const [xR, setxR] = useState("");
  const [sh, setshow] = useState([]);
  useEffect(() => {
    var elt = document.getElementById("calculator");
    var calculator = Desmos.GraphingCalculator(elt, { expressions: false });
    calculator.setExpression({ id: "graph1", latex });
    calculator.setExpression({ id: "graph2", latex: `${xL} < x < ${xR}` });
    document.getElementsByClassName(
      "dcg-graphpaper-branding"
    )[0].style.display = "none";
    return () => calculator.destroy();
  });
  async function example() {
    let x = await fetch("http://localhost:5000/False-Position").then(res =>
      res.json()
    );
    setLatex(x.fx);
    setxL(x.xL);
    setxR(x.xR);
  }
  function cal() {
    var err = Infinity;
    var dataSource = [];
    var count = 0;
    var xl = Number(xL);
    var xr = Number(xR);
    var fxl = math.evaluate(new AlgebraLatex().parseLatex(latex).toMath(), {
      x: xl,
    });
    var fxr = math.evaluate(new AlgebraLatex().parseLatex(latex).toMath(), {
      x: xr,
    });
    var xm = (xl * fxr - xr * fxl) / (fxr - fxl);
    console.log(new AlgebraLatex().parseLatex(latex).toMath());
    console.log(xL);
    while (err > 0.000001) {
      var xM = (xl * fxr - xr * fxl) / (fxr - fxl);
      var fxl = math.evaluate(new AlgebraLatex().parseLatex(latex).toMath(), {
        x: xl,
      });
      var fxr = math.evaluate(new AlgebraLatex().parseLatex(latex).toMath(), {
        x: xr,
      });
      var fxm = math.evaluate(new AlgebraLatex().parseLatex(latex).toMath(), {
        x: xM,
      });
      dataSource.push({
        key: count,
        iteration: count,
        xL: xl,
        xR: xr,
      });
      if (fxm * fxr < 0) {
        xl = xM;
      } else if (fxm * fxr > 0) {
        xr = xM;
      }
      if (count !== 0) {
        err = Math.abs((xM - xm) / xM);
      }
      xm = xM;
      count++;
      dataSource[count - 1] = { ...dataSource[count - 1], xM, err };
    }
    setshow(<Table dataSource={dataSource} columns={columns} />);
  }
  return (
    <div>
      <div style={{ display: "flex" }}>
        <h1 style={{ marginRight: 10 }}>f(x)</h1>
        <EditableMathField
          style={{ width: 300, height: 30 }}
          latex={latex}
          onChange={mathField => {
            setLatex(mathField.latex());
          }}
        />
      </div>
      <div style={{ display: "flex" }}>
        <h1 style={{ marginRight: 10 }}>xL</h1>
        <InputNumber
          style={{ marginRight: 10 }}
          onChange={value => {
            setxL(value);
          }}
          value={xL}
        />
        <h1 style={{ marginRight: 10 }}>xR</h1>
        <InputNumber
          onChange={value => {
            setxR(value);
          }}
          value={xR}
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
export default Falseposition;
