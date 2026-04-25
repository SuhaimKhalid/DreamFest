import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Login } from "./assets/Pages/Login";
import NavbarComponent from "./assets/Utilities/NavbarComponent";
import { RegisterPage } from "./assets/Pages/RegisterPage";

function App() {
  return (
    <>
      {/* <NavbarComponent /> */}
      <RegisterPage />
      {/* <Login /> */}
    </>
  );
}

export default App;
