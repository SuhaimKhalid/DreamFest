import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Login } from "./assets/Pages/Login";
import NavbarComponent from "./assets/Utilities/NavbarComponent";
import { RegisterPage } from "./assets/Pages/RegisterPage";
import { Route, Routes } from "react-router-dom";
import { WildScreen } from "./assets/Pages/WildScreen";
import "../src/assets/Style/wildscreen.css";
import { DashBoard } from "./assets/Pages/DashBoard";

function App() {
  return (
    <>
      {/* <NavbarComponent /> */}
      <Routes>
        <Route path="/" element={<WildScreen />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<DashBoard />}></Route>
      </Routes>
    </>
  );
}

export default App;
