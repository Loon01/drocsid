import React, { createContext, useEffect} from "react";
import { socket } from "./socket";

export const SocketContext = createContext(socket);

export const SocketProvider = ({children}) => {
    useEffect(() => {
        socket.connect();
        
        return () => {
            socket.disconnect();
        };
    }, []);


    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}