import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <main className="container mx-auto p-4">{children}</main>
    </>
  );
};

export default Layout;
