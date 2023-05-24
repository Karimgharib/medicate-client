import React from "react";
import Home from "./pages/Home";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Check from "./pages/Check";
import Lungs from "./pages/Lungs";
import Brain from "./pages/Brain";
import Skin from "./pages/Skin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Hospital from "./pages/Hospital";
import Doctor from "./pages/Doctor";
import ChatHome from "./pages/ChatHome";

import Chat from "./components/Chat";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/check", element: <Check /> },
      { path: "/lungs", element: <Lungs /> },
      { path: "/brain", element: <Brain /> },
      { path: "/skin", element: <Skin /> },
      { path: "/hospital", element: <Hospital /> },
      { path: "/doctor", element: <Doctor /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/chathome",
    element: <ChatHome />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
