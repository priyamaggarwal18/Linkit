import express from "express";
import {
  createLink,
  getUserLinks,
  deleteLink,
  updateLink,
  updateLinkClickCount,
} from "../controllers/linkController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createLink);
router.get("/", authMiddleware, getUserLinks);
router.delete("/:id", authMiddleware, deleteLink);
router.put("/:id", authMiddleware, updateLink);
router.put("/:id/click", updateLinkClickCount);

export default router;
