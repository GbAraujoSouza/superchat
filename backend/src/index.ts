import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import prismaConnection from "./PrismaConnection";

import messageRouter from "./routes/messages.routes";
import userRouter from "./routes/user.routes"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cors());
app.use(messageRouter);
app.use(userRouter);


// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   const userId = socket.handshake.query.userId as string;
//   console.log(socket.handshake);
//   console.log("User connected: " + socket.id);

//   socket.on("private_message", async ({ senderId, receiverId, content }) => {
//     const newMessage = await prismaConnection.message.create({
//       data: {
//         senderId: senderId,
//         receiverId: receiverId,
//         content: content,
//       },
//       include: {
//         receiver: true,
//         sender: true,
//       }
//     });
    // socket.to(receiverId).emit(newMessage);
//   })

//   socket.on("send_message", (data) => {

//     socket.to(data.room).emit("receive_message", );
//   });

//   socket.on("join_room", (room) => {
//     socket.join(room);
//   })
// });

app.listen(3001, () => {
  console.log("Server is running at http://localhost:3001");
});
