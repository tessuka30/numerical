import "antd/dist/antd.css";
import "./App.css";
import { Layout, Menu, Breadcrumb } from "antd";
import { useState } from "react";
import Bisection from "./root-of-equation/bisection";
import Falseposition from "./root-of-equation/false-position";
import Lagrange from "./interpolation/lagrange";
import Spline from "./interpolation/spline";
import Newtondiff from "./interpolation/newtondiff";
import Onepoint from "./root-of-equation/onepoint";
import Newtonrhap from "./root-of-equation/newtonrhapson";
import Secant from "./root-of-equation/secant";
import Cramer from "./linear-algebra/cramer";
import Gausselim from "./linear-algebra/gausselim";
import Gaussjordan from "./linear-algebra/gaussjordan";
import LU from "./linear-algebra/lu";
import Jacobi from "./linear-algebra/jacobi";
import Gaussseidel from "./linear-algebra/gaussseidel";
import Conjugate from "./linear-algebra/conjugate";
import Linear from "./least squares/linear";
import Poly from "./least squares/polynomial";
import Multi from "./least squares/multilinear";
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
function App() {
  const [collapsed, setcollapsed] = useState(false);
  const [current, setcurrent] = useState("0");
  function onCollapse(e) {
    setcollapsed(e);
  }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          selectedKeys={[current]}
          mode="vertical"
          onClick={(e) => {
            setcurrent(e.key);
          }}
        >
          <Menu.Item key="0">HOME</Menu.Item>
          <SubMenu key="sub1" title="Root of Equation">
            <Menu.Item key="1.1">Bisection</Menu.Item>
            <Menu.Item key="1.2">False Position</Menu.Item>
            <Menu.Item key="1.3">One point</Menu.Item>
            <Menu.Item key="1.4">Newton Rhapson</Menu.Item>
            <Menu.Item key="1.5">secant</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title="Linear Algebra">
            <Menu.Item key="2.1">Cramer</Menu.Item>
            <Menu.Item key="2.2">Gauss Elimination</Menu.Item>
            <Menu.Item key="2.3">Gauss Jordan</Menu.Item>
            <Menu.Item key="2.4">LU Decomposition</Menu.Item>
            <Menu.Item key="2.5">Jacobi</Menu.Item>
            <Menu.Item key="2.6">Gauss seidel</Menu.Item>
            <Menu.Item key="2.7">Conjugate gradient</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title="Interpolation">
            <Menu.Item key="3.1">Newton divided difference</Menu.Item>
            <Menu.Item key="3.2">Lagrange</Menu.Item>
            <Menu.Item key="3.3">Spline</Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" title="Least squares">
            <Menu.Item key="4.1">Linear</Menu.Item>
            <Menu.Item key="4.2">Polynomial</Menu.Item>
            <Menu.Item key="4.3">Multi-Linear</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        {" "}
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {current === "0" && (
              <div style={{ textAlign: "center" }}>
                <img
                  src="https://media4.giphy.com/media/l2JdTgYZ7VG4EeBVe/giphy.gif?cid=ecf05e476nm2w3c05hyy6zfw4ibqhozdwlbbpg54w0kgj4ob&rid=giphy.gif&ct=g"
                  alt="stonk"
                ></img>
              </div>
            )}
            {current === "1.1" && (
              <div>
                <h1>Bisection</h1>
                <Bisection />
              </div>
            )}
            {current === "1.2" && (
              <div>
                <h1>False-Position</h1>
                <Falseposition />
              </div>
            )}
            {current === "1.3" && (
              <div>
                <h1>Onepoint</h1>
                <Onepoint />
              </div>
            )}
            {current === "1.4" && (
              <div>
                <h1>Newton Rhapson</h1>
                <Newtonrhap />
              </div>
            )}
            {current === "1.5" && (
              <div>
                <h1>Secant</h1>
                <Secant />
              </div>
            )}
            {current === "2.1" && (
              <div>
                <h1>Cramer</h1>
                <Cramer />
              </div>
            )}
            {current === "2.2" && (
              <div>
                <h1>Gauss Elimination</h1>
                <Gausselim />
              </div>
            )}
            {current === "2.3" && (
              <div>
                <h1>Gauss Jordan</h1>
                <Gaussjordan />
              </div>
            )}
            {current === "2.4" && (
              <div>
                <h1>LU Decomposition</h1>
                <LU />
              </div>
            )}
            {current === "2.5" && (
              <div>
                <h1>Jacobi</h1>
                <Jacobi />
              </div>
            )}
            {current === "2.6" && (
              <div>
                <h1>Gauss seidel</h1>
                <Gaussseidel />
              </div>
            )}
            {current === "2.7" && (
              <div>
                <h1>Conjugate gradient</h1>
                <Conjugate />
              </div>
            )}
            {current === "3.1" && (
              <div>
                <h1>Newton divided difference</h1>
                <Newtondiff />
              </div>
            )}
            {current === "3.2" && (
              <div>
                <h1>Lagrange Interpolation</h1>
                <Lagrange />
              </div>
            )}
            {current === "3.3" && (
              <div>
                <Spline />
              </div>
            )}
            {current === "4.1" && (
              <div>
                <h1>Linear</h1>
                <Linear />
              </div>
            )}
            {current === "4.2" && (
              <div>
                <h1>Polynomial</h1>
                <Poly />
              </div>
            )}
            {current === "4.3" && (
              <div>
                <h1>Multiple-Linear</h1>
                <Multi />
              </div>
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Theerachot Aimaokjai</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
