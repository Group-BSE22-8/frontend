// ** React Imports
import React from "react";
import { lazy } from "react";
const Login = lazy(() => import("../../views/Auth/Login"));
const Dashboard = lazy(() => import("../../views/Dashboard/Dashboard"));
const Projects = lazy(() => import("../../views/Projects/Project"));
const Applications = lazy(() => import("../../views/Applications/Application"));
const Infrastructure = lazy(() =>import("../../views/Infrastructure/Infrastructure"));
const Users = lazy(() => import("../../views/Users/Users"));
const Routes = [
  {
    path: "/",
    index: true,
    element: <Login />,
  },
  {
    path: "/dashboard",
    index: true,
    element: <Dashboard />,
  },
  {
    path: "/projects",
    index: true,
    element: <Projects />,
  },
  {
    path: "/applications",
    index: true,
    element: <Applications />,
  },
  {
    path: "/infrastructure",
    index: true,
    element: <Infrastructure />,
  },
  {
    path: "/user",
    index: true,
    element: <Users />,
  },
];

export { Routes };
