import { Outlet } from "react-router-dom";
import NavbarComponent from "../Components/NavbarComponent";

export const Layout = () => {
  return (
    <>
      <NavbarComponent />
      <Outlet />
    </>
  );
};
