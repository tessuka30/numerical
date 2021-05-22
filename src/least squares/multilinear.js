import react, { useEffect, useState } from "react";
import { StaticMathField } from "react-mathquill";
import { InputNumber, Button, Card, Result } from "antd";
const math = require("mathjs");
const { regression } = require("multiregress");
function Multi() {
  const [col, setcol] = useState([]);
  const [row, setrow] = useState([]);
  const [inputX, setinputX] = useState([]);
  const [inputY, setinputY] = useState([]);
  const [X, setX] = useState([]);
  const [calxp, setxp] = useState([]);
  const [calX, setcalX] = useState([]);
  const [calY, setcalY] = useState([]);
  const [show, setShow] = useState([]);
  useEffect(() => {
    if (calX.length !== 0 && calY.length !== 0) {
      var arr = math.clone(calX);
      for (let i = 0; i < col; i++) {
        arr[i].push(calY[i]);
      }
      arr = regression(arr);
      var result = arr[0];
      for (let i = 0; i < arr.length - 1; i++) {
        result += calxp[i] * arr[i + 1];
      }
      result = math.round(result);
      setShow([
        <Card title="ANSWER" style={{ width: 300 }}>
          <StaticMathField>{`f\\left(X\\right)=${result}`}</StaticMathField>
        </Card>,
      ]);
    }
  }, [calX, calY, calxp]);
  async function example() {
    let x = await fetch("http://localhost:5000/Multi-Linear")
      .then((res) => res.json())
      .catch((err) => {
        return undefined;
      });
    if (x !== undefined) {
      setcol(x.col);
      setrow(x.row);
      let tempdiv = [];
      for (let i = 0; i < x.col; i++) {
        let tempcol = [];
        for (let j = 0; j < x.row; j++) {
          tempcol.push(<InputNumber id={"inputX" + i + j} />);
        }
        tempdiv.push(<div>{tempcol}</div>);
      }
      setinputX(tempdiv);
      tempdiv = [];
      for (let i = 0; i < x.col; i++) {
        let tempcol = [];
        tempcol.push(<InputNumber id={"inputY" + i} />);
        tempdiv.push(<div>{tempcol}</div>);
      }
      setinputY(tempdiv);
      tempdiv = [];
      for (let i = 0; i < x.row; i++) {
        let tempcol = [];
        tempcol.push(<InputNumber id={"xp" + i} />);
        tempdiv.push(<div>{tempcol}</div>);
      }
      setX(tempdiv);
      for (let i = 0; i < x.col; i++) {
        for (let j = 0; j < x.row; j++) {
          document.getElementById("inputX" + i + j).value = x.X[i][j];
        }
      }
      for (let i = 0; i < x.col; i++) {
        document.getElementById("inputY" + i).value = x.Y[i];
      }
      for (let i = 0; i < x.row; i++) {
        document.getElementById("xp" + i).value = x.Xi[i];
      }
      setcol(x.col);
      setrow(x.row);
    }
  }
  async function cal() {
    await setcalX([]);
    await setcalY([]);
    await setxp([]);
    let temp = [];
    for (let i = 0; i < col; i++) {
      let tempA = [];
      for (let j = 0; j < row; j++) {
        tempA.push(Number(document.getElementById("inputX" + i + j).value));
      }
      temp.push(tempA);
    }
    setcalX(temp);
    temp = [];
    for (let i = 0; i < col; i++) {
      temp.push(Number(document.getElementById("inputY" + i).value));
    }
    setcalY(temp);
    temp = [];
    for (let i = 0; i < row; i++) {
      temp.push(Number(document.getElementById("xp" + i).value));
    }
    setxp(temp);
  }
  async function create() {
    await setinputX([]);
    await setinputY([]);
    await setX([]);
    await setShow([]);
    let tempdiv = [];
    for (let i = 0; i < col; i++) {
      let tempcol = [];
      for (let j = 0; j < row; j++) {
        tempcol.push(
          <InputNumber id={"inputX" + i + j} placeholder={"X" + (i + 1)} />
        );
      }
      tempdiv.push(<div>{tempcol}</div>);
    }
    setinputX(tempdiv);
    tempdiv = [];
    for (let i = 0; i < col; i++) {
      let tempcol = [];
      tempcol.push(<InputNumber id={"inputY" + i} />);
      tempdiv.push(<div>{tempcol}</div>);
    }
    setinputY(tempdiv);
    tempdiv = [];
    for (let i = 0; i < row; i++) {
      let tempcol = [];
      tempcol.push(<InputNumber id={"xp" + i} />);
      tempdiv.push(<div>{tempcol}</div>);
    }
    setX(tempdiv);
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h3 style={{ marginRight: 10 }}>Column</h3>
            <InputNumber
              style={{ marginRight: 10 }}
              min={0}
              value={col}
              onChange={(e) => {
                setcol(e);
              }}
            />
            <h3 style={{ marginRight: 10 }}>Row</h3>
            <InputNumber
              min={0}
              value={row}
              onChange={(e) => {
                setrow(e);
              }}
            />
            <Button type="primary" onClick={create}>
              SET
            </Button>
            <Button type="primary" onClick={example}>
              EXAMPLE
            </Button>
          </div>
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
              <div>
                <h2>X predict</h2>
                {X}
              </div>
              <Button type="primary" onClick={cal}>
                CALCULATOR
              </Button>
            </div>
          )}
        </div>
        <div>{show.length !== 0 && show}</div>
      </div>
    </div>
  );
}
export default Multi;
