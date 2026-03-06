import { io } from "socket.io-client";
// {206.189.212.166} use for development
// for full deployment use drocsid.org
export const socket = io("https://drocsid.org", {
  path: "/socket.io",
  transports: ["websocket", "polling"],
});