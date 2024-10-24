import express, { Express, Request, Response } from "express";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app: Express = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// * Set View engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

app.get("/", async (req: Request, res: Response) => {
  res.json({ msg: "email send succes" });
});

// * Set Queue
import "./jobs/index.js";
import routes from "./routes/routing.js";

app.use("/", routes);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
