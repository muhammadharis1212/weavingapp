import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import SideBar from "./components/sidebar/SideBar";
import Home from "./pages/home/Home";
import Items from "./pages/items/Items";
import Login from "./pages/Login/Login";
import EditProfile from "./pages/user/EditProfile";
import User from "./pages/user/User";
import Vendors from "./pages/vendors/Vendors";
import CreateItem from "./pages/items/CreateItem";

function App() {
  // const { token } = useContext(AuthContext);
  const token = sessionStorage.getItem("token");
  console.log("token : ", token);

  if (!token) {
    return <Login />;
  }

  return (
    <div className="app">
      <Layout>
        <Navbar />
        <Layout>
          <SideBar />
          <Routes>
            <Route index path="/" element={<Home />} />

            <Route path="user" element={<User />}>
              <Route path="update" element={<EditProfile />} />
            </Route>

            <Route path="items" element={<Items />}></Route>
            <Route path="items/new" element={<CreateItem />} />

            <Route path="vendors" element={<Vendors />} />
            <Route path="/auth/login" element={<Login />} />
          </Routes>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
