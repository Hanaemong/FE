import "./App.css";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { requestPermission } from "./firebaseConfig.ts";
import { useEffect } from "react";
import firebase from "firebase/app";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});
function App() {
  requestPermission();
  useEffect(() => {
    if (firebase.messaging.isSupported()) {
      const messaging = firebase.messaging();
      messaging.onMessage((payload) => {
        console.log(payload);
      });
    }
  }, []);
  return (
    <div className="min-h-screen">
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </div>
  );
}

export default App;
