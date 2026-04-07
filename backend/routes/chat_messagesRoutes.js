const express = require("express");
const router = express.Router();
const messageController = require("../controllers/chat_messagesController");

// GET  /api/messages/:roomId - 채팅방 대화 불러오기
router.get("/:roomId", messageController.getMessagesByRoom);

// POST /api/messages - 메시지 보내기
router.post("/", messageController.sendMessage);

// PATCH /api/messages/:roomId/read - 읽음 표시 업데이트 
router.patch("/:roomId/read", messageController.markAsRead);

module.exports = router;