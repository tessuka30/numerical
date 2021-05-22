import react, { useEffect, useState } from "react";
import { StaticMathField } from "react-mathquill";
import { InputNumber, Button, Card } from "antd";
import regression from "regression";
function Poly() {
  const [col, setcol] = useState([]);
  const [inputX, setinputX] = useState([]);
  const [inputY, setinputY] = useState([]);
  const [X, setX] = useState([]);
  const [calX, setcalX] = useState([]);
  const [calY, setcalY] = useState([]);
  const [show, setShow] = useState([]);
  useEffect(() => {
    if (calX.length !== 0 && calY.length !== 0) {
      var arr = [];
      for (let i = 0; i < col; i++) {
        arr.push([]);
        arr[i].push(calX[i]);
        arr[i].push(calY[i]);
      }
      const result = regression.polynomial(arr, { precision: 6 }).predict(X)[1];
      setShow([
        <Card title="ANSWER" style={{ width: 300 }}>
          <StaticMathField>{`f\\left(${X}\\right)=${result}`}</StaticMathField>
        </Card>,
      ]);
    }
  }, [calX, calY, X]);
  async function example() {
    let x = await fetch("http://localhost:5000/Polynomial")
      .then((res) => res.json())
      .catch((err) => {
        return undefined;
      });
    if (x !== undefined) {
      await setinputX([]);
      await setinputY([]);
      await setcalX([]);
      await setcalY([]);
      await setX(0);
      await setShow([]);
      let tempdiv = [];
      for (let i = 0; i < x.col; i++) {
        let tempcol = [];
        tempcol.push(<InputNumber id={"inputX" + i} />);
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
      for (let i = 0; i < x.col; i++) {
        document.getElementById("inputX" + i).value = x.X[i].toString();
        document.getElementById("inputY" + i).value = x.Y[i].toString();
      }
      setX(x.Xi);
      setcol(x.col);
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
  async function create() {
    await setinputX([]);
    await setinputY([]);
    await setcalX([]);
    await setcalY([]);
    await setX(0);
    await setShow([]);
    let tempdiv = [];
    for (let i = 0; i < col; i++) {
      let tempcol = [];
      tempcol.push(<InputNumber id={"inputX" + i} />);
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
                }}
              />
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
export default Poly;
