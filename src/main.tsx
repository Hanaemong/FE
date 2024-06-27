import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Hello } from "./pages/hello.tsx";
import { CreateTeam, Home, Join, Search } from "./pages/index.ts";
import { Navbar } from "./components/index.ts";
import Login from "./pages/auth/Login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Hello /> },
      { path: "join", element: <Join /> },
      { path: "search", element: <Search /> },
      { path: "create-team", element: <CreateTeam /> },
      { path: "login", element: <Login /> },
      {
        element: <Navbar />,
        children: [{ path: "home", element: <Home /> }],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
