import { ConfigProvider, notification } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./containers/login";
import { AuthContextProvider } from "./store/auth-context";

import React, { useEffect, useMemo, useState, Fragment } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LoginOutlined,
  BellFilled,
  InfoCircleFilled,
} from "@ant-design/icons";
import { Affix } from "antd";
import { Breadcrumb, Layout, Menu, theme, Tag } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import moon from "./assets/moon.png";
import sun from "./assets/sun.png";
import LabManualScreen from "./containers/labManual";
import ParametersScreen from "./containers/parameters";

import OperatorParamsScreen from "./containers/operatorParams";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  // getItem("Dashboard", "home", <PieChartOutlined />),
  getItem("LAB(MANUAL)", "labManual", <DesktopOutlined />),
  // getItem("Add Users", "addUsers", <UserOutlined />),
];

const App = () => {
  const [checkLogin, setCheckLogin] = useState(false);
  const [url, setUrl] = useState("labManual");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const [userType, setUserType] = useState();

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("user"));
    if (data) {
      //  myArray?.[0] ?? 'default';
      // const role = data.roles?.[0] ?? "ROLE_ADMIN";
      setUserType(data.roles[0]);
    }
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const onClick = (e) => {
    console.log("click ", url);
    let uri = e.keyPath.length > 1 ? `/${e.keyPath[0]}` : `/${e.keyPath[0]}`;
    setUrl([e.keyPath[0]]);

    navigate(uri);
  };
  const getLogin = () => {
    let token = localStorage.getItem("token");
    let user = JSON.parse(localStorage.getItem("user"));

    if (user && token) {
      setCheckLogin(true);
      if (user.roles[0] === "ROLE_ADMIN") navigate("/labManual");
      else if (user.roles[0] === "ROLE_OPERATOR") {
        navigate("/operatorParams");
      }
    } else {
      navigate("/");
    }
  };
  const logoutFunc = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload(false);
  };
  useEffect(() => {
    if (checkLogin === false) getLogin();
  }, [checkLogin]);
  const customDark = {
    colorPrimary: "#2E3D55",
    colorPrimaryBg: "#2E3D55",
    colorLink: "#2E3D55",
    colorBgContainer: "#001529",
    // colorBgBase: "#f3a662",
    colorBgBase: "#33345e",
    colorText: "#fff",
    colorPrimaryTextActive: "#000",
    colorTextBase: "#fff",
    colorBgTextActive: "#000",
    colorPrimaryText: "#fff",
    colorLinkHover: "#2E3D55",
    colorFillContentHover: "#2E3D55",
    colorPrimaryBgHover: "#2E3D55",

    colorLinkActive: "#000",
  };
  const customDefault = {
    colorPrimary: "#2E3D55",
    colorPrimaryBg: "#2E3D55",
    colorLink: "#2E3D55",
    colorLinkHover: "#000",
    colorPrimaryTextActive: "#000",
    // colorLinkHover: "#2E3D55",
    colorFillContentHover: "#2E3D55",
    colorPrimaryBgHover: "#2E3D55",
    colorLinkActive: "#000",
    colorTextBase: "#000",
    colorText: "#000",
    // colorBgTextActive: "#fff",
  };
  const mytheme = isDarkMode ? customDark : customDefault;

  const openNotification = (placement) => {
    api.info({
      duration: 2,
      message: `You have received a notificaton from Admin!`,
      // description: (
      //   <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>
      // ),
      icon: <InfoCircleFilled style={{ color: mytheme.colorPrimary }} />,
      placement,
    });
  };

  return (
    <AuthContextProvider>
      <div className="App">
        {contextHolder}
        <ConfigProvider
          theme={{
            token: {
              ...mytheme,
            },
            components: {},
          }}>
          {checkLogin ? (
            <Layout
              style={{
                minHeight: "100vh",
                overflow: "hidden",
              }}>
              <Affix offsetTop={0}>
                <Sider
                  trigger={null}
                  collapsible
                  collapsed={collapsed}
                  onCollapse={(value) => setCollapsed(value)}
                  style={{
                    minHeight: "100vh",
                  }}>
                  <div className="flex justify-center items-center">
                    <h1 className="text-white font-bold text-3xl p-3">LOGO</h1>
                    {/* <img
                    className="h-10 w-22 ml-auto mr-auto mt-3 mb-2"
                    src={qaca_logo}
                    alt="qaca_logo"
                  /> */}
                  </div>

                  <Menu
                    onClick={onClick}
                    theme="dark"
                    defaultSelectedKeys={[url]}
                    selectedKeys={[url]}
                    mode="inline"
                    items={items}
                    // style={{ background: "orange" }}
                  />
                </Sider>
              </Affix>
              <Layout className="site-layout">
                <Header
                  style={{
                    padding: 0,
                    background: "#001529",
                    paddingLeft: 10,
                    color: "#fff",
                    fontSize: 20,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}>
                  {React.createElement(
                    collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                    {
                      className: "trigger",
                      onClick: () => setCollapsed(!collapsed),
                    }
                  )}
                  {/* <Tag
                  color="red"
                  style={{
                    marginLeft: "auto",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <UserOutlined style={{ fontSize: 15 }} />
                  <span
                    style={{
                      marginLeft: 5,
                      fontSize: 14,
                      textTransform: "uppercase",
                    }}
                    className="font-medium"
                  >
                    {" "}
                    {userEmail || " Admin@gmail.com"}
                  </span>
                </Tag> */}
                  {/* <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["1"]}
                style={{ flex: 3 }}
                items={[
                  // { label: "Agent Configuration", key: "2" },
                  // { label: "Parameters Configuration", value: "1" },
                  { label: "Agent Configuration", key: "1" },
                  { label: "Parameters Configuration", key: "2" },
                ]}
              /> */}
                  <div
                    className="ml-auto flex flex-row items-center justify-end"
                    style={{ flex: 1 }}>
                    {isDarkMode ? (
                      <button
                        onClick={() => setIsDarkMode(false)}
                        className="h-8 w-8 p-1 bg-transparent border-none rounded-full cursor-pointer">
                        <img className="h-6 w-6" src={sun} alt="theme_change" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsDarkMode(true)}
                        className=" bg-white pr-1 pt-1 pl-1 rounded-full cursor-pointer">
                        <img
                          className="h-5 w-5 bg-white rounded-full"
                          src={moon}
                          alt="theme_change"
                        />
                      </button>
                    )}

                    <Menu
                      style={{
                        marginRight: 20,
                        background: "#001529",
                      }}
                      onClick={logoutFunc}>
                      <Menu.Item>
                        <LoginOutlined
                          style={{ color: "#fff", fontWeight: "bolder" }}
                        />
                        <span style={{ color: "#fff" }}>Logout</span>
                      </Menu.Item>
                    </Menu>
                  </div>
                </Header>
                <Content
                  style={{
                    margin: "0 16px",
                  }}>
                  <Routes>
                    {/* <Route path="/labManual" element={<LabManualScreen />} />
                    <Route path="/parameters" element={<ParametersScreen />} />
                    <Route path="/" element={<LabManualScreen />} /> */}
                    {userType === "ROLE_ADMIN" && (
                      <Fragment>
                        <Route
                          path="/labManual"
                          element={<LabManualScreen />}
                        />
                        <Route
                          path="/parameters"
                          element={<ParametersScreen />}
                        />
                        <Route path="/" element={<LabManualScreen />} />
                      </Fragment>
                    )}
                    {userType === "ROLE_OPERATOR" && (
                      <Route
                        path="/operatorParams"
                        element={<OperatorParamsScreen />}
                      />
                    )}
                    {/* <Route
                      path="/operator"
                      element={<OperatorParamsScreen />}
                    />
                    <Route path="/labManual" element={<LabManualScreen />} />
                    <Route path="/parameters" element={<ParametersScreen />} /> */}
                  </Routes>
                </Content>
              </Layout>
            </Layout>
          ) : (
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          )}
        </ConfigProvider>
      </div>
    </AuthContextProvider>
  );
};

export default App;
