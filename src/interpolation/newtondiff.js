import react, { useEffect, useState } from "react";
import { StaticMathField } from "react-mathquill";
import { InputNumber, Button, Card } from "antd";
const math = require("mathjs");
function Newtondiff() {
  const [col, setcol] = useState([]);
  const [inputX, setinputX] = useState([]);
  const [inputY, setinputY] = useState([]);
  const [X, setX] = useState([]);
  const [calX, setcalX] = useState([]);
  const [calY, setcalY] = useState([]);
  const [inter, setinter] = useState();
  const [point, setpoint] = useState([]);
  const [show, setShow] = useState([]);
  useEffect(() => {
    if (calX.length !== 0 && calY.length !== 0) {
      var arr = [];
      var x = [];
      var y = [];
      var xi = X;
      for (let i = 0; i < inter; i++) {
        arr.push([]);
        x.push(calX[Number(document.getElementById("point" + i).value) - 1]);
        y.push(calY[Number(document.getElementById("point" + i).value) - 1]);
      }
      var sum = 0;
      var f = (i, j) => {
        if (arr[i][j] === undefined) {
          if (Math.abs(i - j) == 0) {
            arr[i][j] = y[0];
            return y[0];
          } else if (Math.abs(i - j) == 1) {
            arr[i][j] = (y[j] - y[i]) / (x[j] - x[i]);
            return arr[i][j];
          } else {
            arr[i][j] = (f(i + 1, j) - f(i, j - 1)) / (x[j] - x[i]);
            return arr[i][j];
          }
        } else {
          return arr[i][j];
        }
      };
      for (let i = 0; i < inter; i++) {
        var temp = f(0, i);
        for (let j = 0; j < i; j++) {
          temp *= xi - x[j];
        }
        sum += temp;
      }
      setShow([
        <Card title="ANSWER" style={{ width: 300 }}>
          <StaticMathField>{`f\\left(${X}\\right)=${sum}`}</StaticMathField>
        </Card>,
      ]);
    }
  }, [calX, calY, X, inter]);
  async function example() {
    let x = await fetch("http://localhost:5000/Newton-Divide")
      .then((res) => res.json())
      .catch((err) => {
        return undefined;
      });
    if (x !== undefined) {
      await setinputX([]);
      await setinputY([]);
      await setcalX([]);
      await setcalY([]);
      await setinter(2);
      await setX(0);
      await setpoint([]);
      await setShow([]);
      let tempdiv = [];
      for (let i = 0; i < x.col; i++) {
        let tempcol = [];
        tempcol.push(<InputNumber key={"inputX" + i} id={"inputX" + i} />);
        tempdiv.push(<div key={"x" + i}>{tempcol}</div>);
      }
      setinputX(tempdiv);
      tempdiv = [];
      for (let i = 0; i < x.col; i++) {
        let tempcol = [];
        tempcol.push(<InputNumber key={"inputY" + i} id={"inputY" + i} />);
        tempdiv.push(<div key={"y" + i}>{tempcol}</div>);
      }
      setinputY(tempdiv);
      tempdiv = [];
      for (let i = 0; i < x.i; i++) {
        let tempcol = [];
        tempcol.push(
          <InputNumber
            min={1}
            max={x.col}
            defaultValue={i + 1}
            key={"point" + i}
            id={"point" + i}
          />
        );
        tempdiv.push(<div key={"point" + i}>{tempcol}</div>);
      }
      setpoint(tempdiv);
      for (let i = 0; i < x.col; i++) {
        document.getElementById("inputX" + i).value = x.X[i].toString();
        document.getElementById("inputY" + i).value = x.Y[i].toString();
      }
      setX(x.Xi);
      setcol(x.col);
      setinter(x.i);
    }
  }
  async function cal() {
    await setcalX([]);
    await setcalY([]);
    let temp = [];
    for (let i = 0; i < col; i++) {
      temp.push(Number(document.getElementById("inputX" + i).value));
    }
    setcalX(temp);
    temp = [];
    for (let i = 0; i < col; i++) {
      temp.push(Number(document.getElementById("inputY" + i).value));
    }
    setcalY(temp);
  }
  async function createpoint() {
    await setpoint([]);
    let tempdiv = [];
    for (let i = 0; i < inter; i++) {
      let tempcol = [];
      tempcol.push(
        <InputNumber
          min={1}
          max={col}
          defaultValue={i + 1}
          key={"point" + i}
          id={"point" + i}
        />
      );
      tempdiv.push(<div key={"point" + i}>{tempcol}</div>);
    }
    setpoint(tempdiv);
  }
  async function create() {
    await setinputX([]);
    await setinputY([]);
    await setcalX([]);
    await setcalY([]);
    await setinter(2);
    await setX(0);
    await setpoint([]);
    await setShow([]);
    let tempdiv = [];
    for (let i = 0; i < col; i++) {
      let tempcol = [];
      tempcol.push(<InputNumber key={"inputX" + i} id={"inputX" + i} />);
      tempdiv.push(<div key={"x" + i}>{tempcol}</div>);
    }
    setinputX(tempdiv);
    tempdiv = [];
    for (let i = 0; i < col; i++) {
      let tempcol = [];
      tempcol.push(<InputNumber key={"inputY" + i} id={"inputY" + i} />);
      tempdiv.push(<div key={"y" + i}>{tempcol}</div>);
    }
    setinputY(tempdiv);
  }
  return (
    <react.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <div>
          <InputNumber
            min={0}
            value={col}
            onChange={(e) => {
              setcol(e);
            }}
          ></InputNumber>
          <Button type="primary" onClick={create}>
            SET
          </Button>
          <Button type="primary" onClick={example}>
            EXAMPLE
          </Button>
          {inputX.length !== 0 && inputY.length !== 0 && (
            <div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  <h2>Input X</h2>
                  {inputX}
                </div>
                <div>
                  <h2>Input Y</h2>
                  {inputY}
                </div>
              </div>
              <h2>X predict</h2>
              <InputNumber
                value={X}
                onChange={(e) => {
                  setX(e);
                  setcalX([]);
                  setcalY([]);
                  setShow([]);
                }}
              />
              <br />
              <br />
              <h1>INTERPOLATE</h1>
              <InputNumber
                min={2}
                max={col}
                value={inter}
                onChange={(e) => {
                  setinter(e);
                  setcalX([]);
                  setcalY([]);
                  setShow([]);
                }}
              />
              <Button type="primary" onClick={createpoint}>
                SET
              </Button>
            </div>
          )}
          {point.length !== 0 && (
            <div>
              <h1>POINT</h1>
              {point}
              <Button type="primary" onClick={cal}>
                CALCULATOR
              </Button>
            </div>
          )}
        </div>
        <div>{show.length !== 0 && show}</div>
      </div>
    </react.Fragment>
  );
}
export default Newtondiff;
