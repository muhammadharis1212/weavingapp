import { Layout, theme } from "antd";
import { Outlet, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import SideBar from "./components/sidebar/SideBar";
import Home from "./pages/home/Home";
import Items from "./pages/items/Items";
import Login from "./pages/Login/Login";
import EditProfile from "./pages/user/EditProfile";
import User from "./pages/user/User";
import Vendors from "./pages/vendors/Vendors";
import CreateItem from "./pages/items/CreateItem";
import ChartOfAccounts from "./pages/chartofaccounts/ChartOfAccounts";
const { Header, Footer, Sider, Content } = Layout;

function App() {
  const token = sessionStorage.getItem("token");
  const ProtectedRoute = ({ children }) => {
    if (!token) {
      //return <Navigate to="/login" />;
    }

    return children;
  };

  const AppLayout = () => {
    const {
      token: { colorBgContainer },
    } = theme.useToken();
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <SideBar />
        </Sider>
        <Layout
          className="site-layout"
          style={{
            marginLeft: 200,
          }}
        >
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Navbar />
          </Header>
          <Content
            style={{
              margin: "20px 10px 0",
              padding: 15,
              overflow: "initial",
              background: colorBgContainer,
              borderRadius: "10px",
            }}
          >
            <AppRoutes />
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            HNSoft ©2023
          </Footer>
        </Layout>
      </Layout>
    );
  };

  const AppRoutes = () => {
    return (
      <Routes>
        <Route index path="/" element={<Home />} />

        <Route path="user" element={<User />}>
          <Route path="update" element={<EditProfile />} />
        </Route>

        <Route path="items" element={<Items />}></Route>
        <Route path="items/new" element={<CreateItem />} />
        <Route path="chartofaccounts" element={<ChartOfAccounts />} />

        <Route path="vendors" element={<Vendors />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    );
  };
  return (
    <div className="app">
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    </div>
  );
}

export default App;
