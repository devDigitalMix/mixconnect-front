import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar.jsx";
import Home from "./pages/Home/Home.jsx";
import { GlobalStyled } from "./GlobalStyled.jsx";
import { Authentication } from "./pages/Authentication/Authentication.jsx";
import UserProvider from "./Context/UserContent.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Employees from "./pages/Employees/Employees.jsx";
import { Employee } from "./pages/Employee/Employee.jsx";
import { Chores } from "./pages/Chores/Chores.jsx";
import { ChoreTasks } from "./pages/ChoreTasks/ChoreTasks.jsx";
import { Clients } from "./pages/Clients/Clients.jsx";
import Plans from "./pages/Plans/Plans.jsx";
import Client from "./pages/Client/Client.jsx";
import Logins from "./pages/Logins/Logins.jsx";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Navbar />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/home/profile",
        element: <Profile />,
      },
      {
        path: "/home/clients",
        element: <Clients />,
      },
      {
        path: "/home/client/:id",
        element: <Client />,
      },
      {
        path: "/home/employees",
        element: <Employees />,
      },
      {
        path: "/home/employee/:id",
        element: <Employee />,
      },
      {
        path: "/home/chores/",
        element: <Chores />,
      },
      {
        path: "/home/chores/:id",
        element: <ChoreTasks />,
      },
      {
        path: "/home/plans",
        element: <Plans />,
      },
      {
        path: "/home/acessos",
        element: <Logins />,
      },
    ],
  },
  {
    path: "/",
    element: <Authentication />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyled />
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
