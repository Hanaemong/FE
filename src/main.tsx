import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Hello } from "./pages/hello.tsx";
import { Home, Join } from "./pages/index.ts";
import { Navbar } from "./components/index.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Hello /> },
      { path: "join", element: <Join /> },
      {
        element: <Navbar />,
        children: [
          { path: "hello", element: <Hello /> },
          { path: "home", element: <Home /> },
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
