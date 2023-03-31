import React, { createContext, useCallback, useEffect } from "react";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_BASE_URL);

export const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [online, setOnline] = React.useState([]);

  const handleUserOnline = useCallback((users) => {
    setOnline(users);
    console.log(users);
  }, []);

  useEffect(() => {
    socket.on("user_online", handleUserOnline);
    return () => {
      socket.off("user_online", handleUserOnline);
    };
  }, []);

  return (
    <SocketContext.Provider value={online}>{children}</SocketContext.Provider>
  );
}
