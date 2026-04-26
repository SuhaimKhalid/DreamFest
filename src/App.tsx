import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Login } from "./assets/Pages/Login";
import { RegisterPage } from "./assets/Pages/RegisterPage";
import { Route, Routes } from "react-router-dom";
import { WildScreen } from "./assets/Pages/WildScreen";
import "../src/assets/Style/wildscreen.css";
import { DashBoard } from "./assets/Pages/DashBoard";

import "./assets/Style/dashboard.css";
import { CreateFest } from "./assets/Pages/CreatFest";

function App() {
  return (
    <>
      <main className="main">
        <Routes>
          <Route path="/" element={<WildScreen />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/dashboard" element={<DashBoard />}></Route>
          <Route path="/createfestival" element={<CreateFest />}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
