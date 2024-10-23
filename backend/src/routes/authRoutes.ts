import { Router, Request, Response } from "express";
import { registerSchema } from "../validations/authValidation.js";
import { ZodError } from "zod";
import { formatError, generateRandomNum, renderEmailEjs } from "../helper.js";
import prisma from "../config/database.js";
import bcrypt from "bcrypt";
import { emailQueue, emailQueueName } from "../jobs/EmailQueue.js";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const payload = registerSchema.parse(body);
    let user = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (user) {
      res.status(422).json({
        errors: {
          email: "Email already taken.please use another one.",
        },
      });
    }

    const salt = await bcrypt.genSalt(10);
    payload.password = await bcrypt.hash(payload.password, salt);

    const id = generateRandomNum();
    const token = await bcrypt.hash(id, salt);

    const url = `${process.env.APP_URL}/verify/email/?email=${payload.email}&token=${token}`;

    const html = await renderEmailEjs("verify-email", {
      name: payload.name,
      url: url,
    });

    await emailQueue.add(emailQueueName, {
      to: payload.email,
      subject: "Please verify your email Clash",
      html: html,
    });

    await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        email_verify_token: token,
      },
    });
    res.json({ message: "User created successfully!" });
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = formatError(error);
      res.status(422).json({ message: "Invalid data", errors });
    } else {
      res
        .status(500)
        .json({ error: "Something went wrong.please try again!", data: error });
    }
  }
});

export default router;
