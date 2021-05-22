import { useEffect, useState } from "react";
import { InputNumber, Button, Table } from "antd";
const math = require("mathjs");
var columns = [];
function Jacobi() {
  const [col, setcol] = useState([]);
  const [inputA, setinputA] = useState([]);
  const [inputB, setinputB] = useState([]);
  const [calA, setcalA] = useState([]);
  const [calB, setcalB] = useState([]);
  const [X, setX] = useState([]);
  const [calX, setcalX] = useState([]);
  const [show, setShow] = useState([]);
  useEffect(() => {
    if (calA.length !== 0 && calB.length !== 0 && calX.length !== 0) {
      var err = [];
      for (let i = 0; i < col; i++) {
        err[i] = Infinity;
      }
      var Xi = math.clone(calX);
      var Xinew = math.clone(calX);
      var dataSource = [];
      var count = 1;
      while (err[0] > 0.0000001) {
        for (let i = 0; i < col; i++) {
          let sum = 0;
          for (let j = 0; j < col; j++) {
            if (i === j) {
              sum += Number(calB[i]);
            } else {
              sum -= Number(calA[i][j]) * Number(Xi[j][0]);
            }
          }
          Xinew[i][0] = sum / Number(calA[i][i]);
          err[i] = math.abs((Xinew[i][0] - Xi[i][0]) / Xinew[i][0]);
          if (dataSource[count] === undefined) {
            dataSource[count] = {
              key: count,
              iteration: count,
              ["x" + (i + 1)]: Xinew[i][0],
              ["err" + (i + 1)]: err[i],
            };
          } else {
            dataSource[count] = {
              ...dataSource[count],
              ["x" + (i + 1)]: Xinew[i][0],
              ["err" + (i + 1)]: err[i],
            };
          }
        }
        Xi = math.clone(Xinew);
        if (count === 7) {
          break;
        }
        count++;
      }
      setShow(<Table dataSource={dataSource} columns={columns} />);
    }
  }, [calA, calB, calX]);
  async function example() {
    let x = await fetch("http://localhost:5000/Jacobi")
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
      tempdiv = [];
      for (let i = 0; i < x.col; i++) {
        let tempcol = [];
        tempcol.push(<InputNumber id={"xi" + i} />);
        tempdiv.push(<div>{tempcol}</div>);
      }
      setX(tempdiv);
      for (let j = 0; j < x.col; j++) {
        for (let i = 0; i < x.col; i++) {
          document.getElementById("inputA" + j + i).value = x.A[j][i];
        }
      }
      for (let i = 0; i < x.col; i++) {
        document.getElementById("inputB" + i).value = x.B[i];
      }
      for (let i = 0; i < x.col; i++) {
        document.getElementById("xi" + i).value = x.X[i];
      }
    }
  }
  async function cal() {
    await setcalA([]);
    await setcalB([]);
    await setcalX([]);
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
    temp = [];
    for (let i = 0; i < col; i++) {
      let tempX = [];
      tempX.push(Number(document.getElementById("xi" + i).value));
      temp.push(tempX);
    }
    setcalX(temp);
    columns = [
      {
        title: "iteration",
        dataIndex: "iteration",
        key: "iteration",
      },
    ];
    for (let i = 0; i < col; i++) {
      columns.push(
        {
          title: "x" + (i + 1),
          dataIndex: "x" + (i + 1),
          key: "x" + (i + 1),
        },
        {
          title: "error" + (i + 1),
          dataIndex: "err" + (i + 1),
          key: "err" + (i + 1),
        }
      );
    }
    console.log(columns);
  }
  async function create() {
    await setinputA([]);
    await setinputB([]);
    await setX([]);
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
    tempdiv = [];
    for (let i = 0; i < col; i++) {
      let tempcol = [];
      tempcol.push(<InputNumber id={"xi" + i} />);
      tempdiv.push(<div>{tempcol}</div>);
    }
    setX(tempdiv);
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
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
              <div>
                <h2>X initials</h2>
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
export default Jacobi;
