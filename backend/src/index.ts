import express, { Express, Request, Response } from "express";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import path from "path";
import ejs from "ejs";
import { sendMail } from "./config/mail.js";

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
  await sendMail("hobena8412@chysir.com", "lol", html);
  res.json({ msg: "email send succes" });
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
