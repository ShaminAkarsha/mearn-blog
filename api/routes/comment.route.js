import exprss from "express";
import { createComment, getPostComment } from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js"


const router = exprss.Router();

router.post("/create", verifyToken , createComment);
router.get("/getPostComments/:postId", getPostComment);
export default router;