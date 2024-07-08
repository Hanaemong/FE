import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Alarm,
  CertiRegion,
  ChatList,
  ChatRoom,
  CreateTeam,
  Dues,
  Home,
  Join,
  Landing,
  Login,
  Members,
  My,
  Plan,
  Qrcode,
  Search,
  Sending,
  Survey,
  Team,
} from "./pages/index.ts";
import { Navbar } from "./components/index.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Landing /> },
      { path: "join", element: <Join /> },
      { path: "search", element: <Search /> },
      { path: "create-team", element: <CreateTeam /> },
      { path: "survey", element: <Survey /> },
      { path: "login", element: <Login /> },
      { path: "certificate-region", element: <CertiRegion /> },
      { path: "team", element: <Team /> },
      { path: "team/members", element: <Members /> },
      { path: "team/dues", element: <Dues /> },
      { path: "chat-room", element: <ChatRoom /> },
      { path: "sending", element: <Sending /> },
      { path: "create-plan", element: <Plan /> },
      { path: "qrcode", element: <Qrcode /> },
      {
        element: <Navbar />,
        children: [
          { path: "home", element: <Home /> },
          { path: "alarm", element: <Alarm /> },
          { path: "my", element: <My /> },
          { path: "chats", element: <ChatList /> },
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
