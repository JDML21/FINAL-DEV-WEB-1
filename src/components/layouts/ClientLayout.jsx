import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer"; 
import { Outlet } from "react-router-dom";

function ClientLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default ClientLayout;
