const chatRoomModel = require("../models/chat_roomsModel");

// 채팅방 생성 (이미 있을 시 기존 방 번호 반환)
exports.createRoom = (req, res) => {
    const { product_id, buyer_id, seller_id } = req.body;

    chatRoomModel.findExistingRoom(product_id, buyer_id, (err, existing) => {
        if (err) return res.status(500).json({ error: err.message });
        if (existing.length > 0) return res.json({ roomId: existing[0].id, message: "기존 방으로 연결합니다." });

        chatRoomModel.create(req.body, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ roomId: results.insertId, message: "새 채팅방이 생성되었습니다." });
        });
    });
};

// 내 채팅 목록 가져오기
exports.getMyRooms = (req, res) => {
    const userId = req.params.userId;
    chatRoomModel.findByUserId(userId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};