import express, { Express, Request, Response } from "express";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { createServer, Server as HttpServer } from "http";
import { Server } from "socket.io";
import ExpressFileUpoad from "express-fileupload";
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app: Express = express();
const server: HttpServer = createServer(app);
//
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

export { io };
setupSocket(io);
//

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(limiter);
app.use(express.static("public"));
app.use(
  ExpressFileUpoad({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// * Set View engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

app.get("/", async (req: Request, res: Response) => {
  res.json({ msg: "email send succes" });
});

// * Set Queue
import "./jobs/index.js";
import routes from "./routes/routing.js";
import { limiter } from "./config/rateLimit.js";
import { setupSocket } from "./socket.js";

app.use("/", routes);

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
