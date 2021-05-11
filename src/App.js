import "antd/dist/antd.css";
import "./App.css";
import { Layout, Menu, Breadcrumb } from "antd";
import { useState } from "react";
import Bisection from "./root-of-equation/bisection";
import Falseposition from "./root-of-equation/false-position";
const { Header, Content, Footer, Sider } = Layout;
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
          mode="inline"
          onClick={e => {
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
              <div>
                <h1>Home</h1>
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
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Theerachot Aimaokjai</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
