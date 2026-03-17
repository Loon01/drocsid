import { socket } from "./socket";

export function sendDirectMessage(con_id, sender_id, context) {
    socket.emit("dm:send", {
        con_id,
        sender_id,
        context,
    });
}