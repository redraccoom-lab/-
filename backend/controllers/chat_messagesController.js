const chatmessageModel = require("../models/chat_messagesModel");

// 채팅방의 대화 내역 가져오기
exports.getMessagesByRoom = (req, res) => {
    const { roomId } = req.params;

    chatmessageModel.findByRoomId(roomId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// 메시지 전송 및 저장
exports.sendMessage = (req, res) => {
    const { room_id, sender_id, message } = req.body;

    // 필수 데이터 검증
    if (!room_id || !sender_id || !message) {
        return res.status(400).json({ error: "방 번호, 보낸 이, 메시지 내용은 필수입니다." });
    }

    chatmessageModel.create(req.body, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
            message: "메시지 전송 성공",
            messageId: results.insertId
        });
    });
};

// 메시지 읽음 처리
exports.markAsRead = (req, res) => {
    const { roomId } = req.params;
    const { userId } = req.body; // 접속 중인 유저 ID

    chatmessageModel.updateReadStatus(roomId, userId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "읽음 처리 완료", affectedRows: results.affectedRows });
    });
};