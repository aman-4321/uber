import { createContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | null>(null);

const socket: Socket = io(`${import.meta.env.VITE_BASE_URL}`);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
