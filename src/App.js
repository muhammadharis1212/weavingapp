import { Layout, theme } from "antd";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import SideBar from "./components/sidebar/SideBar";
import Home from "./pages/home/Home";
import Items from "./pages/items/Items";
import Login from "./pages/Login/Login";
import EditProfile from "./pages/user/EditProfile";
import User from "./pages/user/User";
import CreateItem from "./pages/items/CreateItem";
import ChartOfAccounts from "./pages/chartofaccounts/ChartOfAccounts";
import Party from "./pages/party/Party";
import PartyView from "./pages/party/PartyView";
import CreatePartyView from "./pages/party/CreatePartyView";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Suppliers from "./pages/suppliers/Suppliers";
import CreateSupplier from "./pages/suppliers/CreateSupplier";
import CreateCustomerView from "./pages/customers/CreateCustomerView";
import SupplierView from "./pages/suppliers/SupplierView";
import NewBillView from "./pages/bills/NewBillView";
import TableForm from "./components/tableform/TableForm";
const { Header, Sider, Content } = Layout;

function App() {
  const { token } = theme.useToken();
  const { authToken } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!authToken) {
      //return <Navigate to="/login" />;
    }

    return children;
  };

  const AppLayout = () => {
    const {
      token: { colorBgContainer },
    } = theme.useToken();
    return (
      <Layout>
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
              height: "10vh",
              padding: 0,
              background: "#f7f7fe",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            <Navbar />
          </Header>
          <Content
            style={{
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              background: colorBgContainer,
              height: "90vh",
            }}
          >
            <AppRoutes />
          </Content>
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
        <Route path="party" element={<Party />} />
        <Route path="party/:id" element={<PartyView />} />
        <Route path="party/new" element={<CreatePartyView />} />
        <Route path="suppliers" element={<Suppliers />} />
        <Route path="suppliers/new" element={<CreateSupplier />} />
        <Route path="suppliers/:id" element={<SupplierView />} />
        <Route path="bills/new" element={<NewBillView />} />
        <Route path="customers/new" element={<CreateCustomerView />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="tableform" element={<TableForm />} />
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
