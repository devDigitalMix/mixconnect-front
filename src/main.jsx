/* eslint-disable no-unused-vars */
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
import Clients from "./pages/Clients/Clients.jsx";
import Plans from "./pages/Plans/Plans.jsx";
import Client from "./pages/Client/Client.jsx";
import Logins from "./pages/Logins/Logins.jsx";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DeletedClients from "./pages/DeletedClients/DeletedClients.jsx";
import DeletedClient from "./pages/DeletedClient/DeletedClient.jsx";
import { AllNps } from "./pages/AllNps/AllNps.jsx";
import { SendNps } from "./pages/SendNps/SendNps.jsx";
import Nps from "./pages/Nps/Nps.jsx";
import { ClientApproval } from "./pages/ClientApproval/ClientApproval.jsx";
import { Approval } from "./pages/Approval/Approval.jsx";
import { SendApproval } from "./pages/SendApproval/SendApproval.jsx";
import { PropostaCreate } from "./pages/PropostaCreate/PropostaCreate.jsx";
import { SendProposta } from "./pages/SendProposta/SendProposta.jsx";
import { Propostas } from "./pages/Propostas/Propostas.jsx";

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
        path: "/home/deletedclients",
        element: <DeletedClients />,
      },
      {
        path: "/home/deletedclient/:id",
        element: <DeletedClient />,
      },
      {
        path: "/home/client/:id",
        element: <Client />,
      },
      {
        path: "/home/client/:id/approval",
        element: <ClientApproval />,
      },
      {
        path: "/home/approval/:id",
        element: <Approval />,
      },

      {
        path: "/home/client/:id/nps",
        element: <AllNps />,
      },
      {
        path: "/home/viewnps/:id",
        element: <Nps />,
      },
      {
        path: "/home/nps",
        element: <AllNps />,
      },
      {
        path: "/home/client/:id/journey/:choreId/",
        element: <ChoreTasks />,
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
        path: "/home/propostas",
        element: <Propostas />,
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
      {
        path: "/home/criarProposta",
        element: <PropostaCreate />,
      },
      {
        path: "/home/criarProposta/:id",
        element: <PropostaCreate />,
      },
      {
        path: "/home/criarProposta/",
        element: <PropostaCreate />,
      },
    ],
  },
  {
    path: "/",
    element: <Authentication />,
  },
  {
    path: "/sendnps/:id",
    element: <SendNps />,
  },
  {
    path: "/sendproposta/:id",
    element: <SendProposta />,
  },
  {
    path: "/sendapproval/:id",
    element: <SendApproval />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyled />
    <SkeletonTheme baseColor="#3b3b3b" highlightColor="#807DF0" duration={0.5}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </SkeletonTheme>
  </React.StrictMode>
);
