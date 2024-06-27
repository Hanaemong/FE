import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Hello } from "./pages/hello.tsx";
import {
  Alarm,
  CertiRegion,
  CreateTeam,
  Home,
  Join,
  Login,
  My,
  Search,
  Survey,
} from "./pages/index.ts";
import { Navbar } from "./components/index.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Hello /> },
      { path: "join", element: <Join /> },
      { path: "search", element: <Search /> },
      { path: "create-team", element: <CreateTeam /> },
      { path: "survey", element: <Survey /> },
      { path: "login", element: <Login /> },
      { path: "certificate-region", element: <CertiRegion /> },
      {
        element: <Navbar />,
        children: [
          { path: "home", element: <Home /> },
          { path: "alarm", element: <Alarm /> },
          { path: "my", element: <My /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
