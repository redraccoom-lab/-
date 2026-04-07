const express = require("express");
const router = express.Router();
const likesController = require("../controllers/likesController");

// like 목록 조회
router.get("/user/:userId", likesController.getMyLikesList);

// like 추가 
router.post("/", likesController.toggleLike);

// like 취소
router.delete("/", likesController.removeLike);

module.exports = router;