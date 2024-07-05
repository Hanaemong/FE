import "./App.css";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { requestPermission } from "./firebaseConfig.ts";
import { useEffect, useState } from "react";
import firebase from "firebase/app";
import { AlarmCard } from "./components/index.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});
function App() {
  const [showAlarm, setShowAlarm] = useState<boolean>(false);
  const [content, setContent] = useState({
    title: "",
    body: "",
    teamId: -1,
  });

  const toggleShowAlarm = (toggle: boolean) => {
    setShowAlarm(toggle);
  };

  requestPermission();
  useEffect(() => {
    if (firebase.messaging.isSupported()) {
      const messaging = firebase.messaging();
      messaging.onMessage((payload) => {
        setContent({
          title: payload.notification.title,
          body: payload.notification.body,
          teamId: payload.data?.teamId,
        });
        console.log(payload);
        setShowAlarm(true);
      });
    }
  }, []);
  return (
    <div className="min-h-screen">
      {showAlarm && (
        <AlarmCard
          title={content.title}
          body={content.body}
          teamId={content.teamId}
          toggleShowAlarm={toggleShowAlarm}
        />
      )}
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </div>
  );
}

export default App;
