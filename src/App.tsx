import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Login } from "./assets/Pages/Login";
import NavbarComponent from "./assets/Utilities/NavbarComponent";
import { RegisterPage } from "./assets/Pages/RegisterPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      {/* <NavbarComponent /> */}
      <Routes>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
