import { Router, Request, Response } from "express";
import { clashSchema } from "../validations/clashValidation.js";
import { ZodError } from "zod";
import {
  formatError,
  imageValidator,
  removeImage,
  uploadImage,
} from "../helper.js";
import { UploadedFile } from "express-fileupload";
import prisma from "../config/database.js";
import authMiddleware from "../middleware/AuthMiddleware.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const clashs = await prisma.clash.findMany({
      where: { user_id: req.user?.id },
    });
    res.json({ message: "Data Fetched", data: clashs });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong.please try again!", data: error });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const clash = await prisma.clash.findUnique({
      where: { id: Number(id) },
      include: {
        ClashItem: {
          select: {
            image: true,
            id: true,
            count: true,
          },
        },
        ClashComments: {
          select: {
            id: true,
            comment: true,
            created_at: true,
          },
          orderBy: {
            id: "desc",
          },
        },
      },
    });
    res.json({ message: "Data Fetched", data: clash });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong.please try again!", data: error });
  }
});

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const payload = clashSchema.parse(body);

    if (req.files?.image) {
      const image: UploadedFile = req.files.image as UploadedFile;
      const validMsg = imageValidator(image?.size, image?.mimetype);
      if (validMsg) {
        res.status(422).json({ errors: { image: validMsg } });
        return;
      }
      payload.image = uploadImage(image);
    } else {
      res.status(422).json({ errors: { image: "Image field is required." } });
      return;
    }

    await prisma.clash.create({
      data: {
        title: payload.title,
        description: payload?.description,
        image: payload?.image,
        user_id: req.user?.id!,
        expire_at: new Date(payload.expire_at),
      },
    });
    res.json({ message: "Clash created successfully!" });
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

router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const payload = clashSchema.parse(body);
    if (req.files?.image) {
      const image: UploadedFile = req.files.image as UploadedFile;
      const validMsg = imageValidator(image?.size, image?.mimetype);
      if (validMsg) {
        res.status(422).json({ errors: { image: validMsg } });
        return;
      }

      const clash = await prisma.clash.findUnique({
        select: { id: true, image: true },
        where: { id: Number(id) },
      });
      if (clash?.image) removeImage(clash?.image);
      payload.image = uploadImage(image);
    }
    await prisma.clash.update({
      data: payload,
      where: { id: Number(id) },
    });
    res.json({ message: "Clash updated successfully!" });
    return;
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

router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const clash = await prisma.clash.findUnique({
      select: { image: true, user_id: true },
      where: { id: Number(id) },
    });
    if (clash?.user_id !== req.user?.id) {
      res.status(401).json({ message: "Un Authorized" });
      return;
    }
    if (clash?.image) removeImage(clash?.image);
    const clashItems = await prisma.clashItem.findMany({
      select: {
        image: true,
      },
      where: {
        clash_id: Number(id),
      },
    });

    if (clashItems.length > 0) {
      clashItems.forEach((item) => {
        removeImage(item.image);
      });
    }

    await prisma.clash.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Clash Deleted successfully!" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    return;
  }
});

export default router;
