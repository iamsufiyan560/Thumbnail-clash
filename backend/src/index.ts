import express, { Express, Request, Response } from "express";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import path from "path";
import ejs from "ejs";

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
  const html = await ejs.renderFile(__dirname + `/views/emails/welcome.ejs`, {
    name: "suf",
  });

  await emailQueue.add(emailQueueName, {
    to: "hobena8412@chysir.com",
    subject: "test",
    html: html,
  });
  res.json({ msg: "email send succes" });
});

// * Set Queue
import "./jobs/index.js";
import { emailQueue, emailQueueName } from "./jobs/EmailQueue.js";

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
