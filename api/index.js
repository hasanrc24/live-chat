const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is live.");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(
  process.env.PORT || 5000,
  console.log("Server Running")
);

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join_chat", (room) => {
    socket.join(room);
  });

  socket.on("typing", (room, typingUserId) =>
    socket.to(room).emit("typing", typingUserId)
  );
  socket.on("stop_typing", (room, typingUserId) =>
    socket.to(room).emit("stop_typing", typingUserId)
  );

  socket.on("new_message", (newMsgR) => {
    let chat = newMsgR.chat;
    if (!chat.users) return;

    chat.users.forEach((user) => {
      if (user._id === newMsgR.sender._id) return;

      socket.in(user._id).emit("message_received", newMsgR);
    });
  });
});
