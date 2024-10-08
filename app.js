require("dotenv").config();
require("express-async-errors");

// express
const express = require("express");
const app = express();

const http = require("http");
const socketio = require("socket.io");

// const originUrl = "https://nexus.axeiny.tech";
const originUrl = "*";

// const originUrl = "http://localhost:5173";
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: originUrl,
  },
});
app.set("io", io);

const cookieParser = require("cookie-parser"); 
const path = require("path");
// dev
const morgan = require("morgan");
// Security
const cors = require("cors");
const rateLimiter = require("express-rate-limit")
const helmet = require("helmet")
const xss = require("xss-clean")
const mongoSanitize = require("express-mongo-sanitize")
// DB
const connectDB = require("./db/connect");
// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
// routers
const questionRouter = require("./routes/questionRoutes");
const resultRouter = require("./routes/ResultRoutes");
const authRouter = require("./routes/authRoutes");
const timerRouter = require("./routes/timerRoutes");
// dev
app.use(express.static(path.join(__dirname, "/client/dist")));
app.use(morgan("tiny"));
app.use(express.json()); // have acces to json data in req.body
app.use(cookieParser(process.env.COOKIES_SECRET));
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
}))
app.use(mongoSanitize());
app.use(xss());
app.use(
  cors({
    origin: originUrl,
    credentials: true,
  })
);

// app.use /api routes
app.use("/api/v1/question", questionRouter);
app.use("/api/v1/result", resultRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/timer", timerRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist", "index.html"));
});

// middleware errors and not-found
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    server.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
