const express = require("express");
const router = express.Router();
const chatRoomController = require("../controllers/chat_roomsController");

// POST /api/chat-rooms (방 만들기)
router.post("/", chatRoomController.createRoom);

// GET /api/chat-rooms/user/:userId (내 채팅 목록)
router.get("/user/:userId", chatRoomController.getMyRooms);

module.exports = router;