import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/profile/Profile";
import Vendors from "./pages/vendors/Vendors";

function App() {
  const { token } = useContext(AuthContext);
  if (!token) {
    return <Login />;
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="vendors" element={<Vendors />} />
        <Route path="user" element={<Profile />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
