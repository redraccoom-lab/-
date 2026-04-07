const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");

// 상품별 댓글 목록 조회
router.get("/product/:productId", commentsController.getCommentsByProduct);

// 댓글 작성
router.post("/", commentsController.addComment);

// 댓글 삭제
router.delete("/:id", commentsController.removeComment);

module.exports = router;