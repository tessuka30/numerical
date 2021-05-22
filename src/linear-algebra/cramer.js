import react, { useEffect, useState } from "react";
import { InputNumber, Button, Card } from "antd";
const math = require("mathjs");
function Cramer() {
  const [col, setcol] = useState([]);
  const [inputA, setinputA] = useState([]);
  const [inputB, setinputB] = useState([]);
  const [calA, setcalA] = useState([]);
  const [calB, setcalB] = useState([]);
  const [show, setShow] = useState([]);
  useEffect(() => {
    if (calA.length !== 0 && calB.length !== 0) {
      let xans = [];
      let detA = math.det(calA);
      for (let i = 0; i < calA.length; i++) {
        let tempA = math.clone(calA);
        for (let j = 0; j < calA.length; j++) {
          tempA[j][i] = calB[j][0];
        }
        let dettemp = math.det(tempA);
        xans[i] = math.round(dettemp / detA);
      }
      setShow([
        <Card title="ANSWER" style={{ width: 300 }}>
          {xans.map((k, i) => {
            let x = [];
            let a = "x" + (i + 1) + ": " + k;
            x.push(a);
            x.push(<br />);
            console.log(x);
            return x;
          })}
        </Card>,
      ]);
    }
  }, [calA, calB]);
  async function example() {
    let x = await fetch("http://localhost:5000/Cramer")
      .then((res) => res.json())
      .catch((err) => {
        return undefined;
      });
    if (x !== undefined) {
      setcol(x.col);
      let tempdiv = [];
      for (let j = 0; j < x.col; j++) {
        let tempcol = [];
        for (let i = 0; i < x.col; i++) {
          tempcol.push(
            <InputNumber
              id={"inputA" + j + i}
              placeholder={"a" + (j + 1) + (i + 1)}
            />
          );
        }
        tempdiv.push(<div>{tempcol}</div>);
      }
      setinputA(tempdiv);
      tempdiv = [];
      for (let i = 0; i < x.col; i++) {
        let tempcol = [];
        tempcol.push(
          <InputNumber id={"inputB" + i} placeholder={"b" + (i + 1) + "1"} />
        );
        tempdiv.push(<div>{tempcol}</div>);
      }
      setinputB(tempdiv);
      for (let j = 0; j < x.col; j++) {
        for (let i = 0; i < x.col; i++) {
          document.getElementById("inputA" + j + i).value = x.A[j][i];
        }
      }
      for (let i = 0; i < x.col; i++) {
        document.getElementById("inputB" + i).value = x.B[i][0];
      }
    }
  }
  async function cal() {
    await setcalA([]);
    await setcalB([]);
    let temp = [];
    for (let j = 0; j < col; j++) {
      let tempA = [];
      for (let i = 0; i < col; i++) {
        tempA.push(Number(document.getElementById("inputA" + j + i).value));
      }
      temp.push(tempA);
    }
    setcalA(temp);
    temp = [];
    for (let i = 0; i < col; i++) {
      let tempB = [];
      tempB.push(Number(document.getElementById("inputB" + i).value));
      temp.push(tempB);
    }
    setcalB(temp);
  }
  async function create() {
    await setinputA([]);
    await setinputB([]);
    await setcalA([]);
    await setcalB([]);
    await setShow([]);
    let tempdiv = [];
    for (let j = 0; j < col; j++) {
      let tempcol = [];
      for (let i = 0; i < col; i++) {
        tempcol.push(
          <InputNumber
            id={"inputA" + j + i}
            placeholder={"a" + (j + 1) + (i + 1)}
          />
        );
      }
      tempdiv.push(<div>{tempcol}</div>);
    }
    setinputA(tempdiv);
    tempdiv = [];
    for (let i = 0; i < col; i++) {
      let tempcol = [];
      tempcol.push(
        <InputNumber id={"inputB" + i} placeholder={"b" + (i + 1) + "1"} />
      );
      tempdiv.push(<div>{tempcol}</div>);
    }
    setinputB(tempdiv);
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
          {inputA.length !== 0 && inputB.length !== 0 && (
            <div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  <h2>Input A</h2>
                  {inputA}
                </div>
                <div>
                  <h2>Input B</h2>
                  {inputB}
                </div>
              </div>
              <br />
              <br />
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
export default Cramer;
