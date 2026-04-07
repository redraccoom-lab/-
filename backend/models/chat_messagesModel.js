const db = require("../config/db");

/**
 * 엔티티 구조
 * - id: INT (PK, AI) - 고유 번호
 * - room_id: INT (NN) - 채팅방 ID
 * - sender_id: INT (NN) - 보낸 사람 ID (유저 테이블 외래키)
 * - message: TEXT (NN) - 메시지 본문 내용
 * - is_read: TINYINT(1) (Default: 0) - 읽음 여부 (0: 안읽음, 1: 읽음)
 * - created_at: DATETIME (Default: CURRENT_TIMESTAMP) - 보낸 시간
 */

const ChatMessage = {
    // 채팅방 모든 메시지 불러오기 (채팅창 열 때)
    findByRoomId: (roomId, callback) => {
        const sql = `
            SELECT m.*, u.nickname as sender_name 
            FROM messages m
            JOIN users u ON m.sender_id = u.id
            WHERE m.room_id = ? 
            ORDER BY m.created_at ASC
        `;
        db.query(sql, [roomId], callback);
    },

    // 메시지 전송 (DB 저장)
    create: (messageData, callback) => {
        const { room_id, sender_id, message } = messageData;
        const sql = "INSERT INTO messages (room_id, sender_id, message) VALUES (?, ?, ?)";
        db.query(sql, [room_id, sender_id, message], callback);
    },

    // 메시지 읽음 처리 (상대방이 방에 들어왔을 때)
    updateReadStatus: (roomId, userId, callback) => {
        // 내가 아닌 상대방이 보낸 메시지들을 읽음으로 변경
        const sql = "UPDATE messages SET is_read = 1 WHERE room_id = ? AND sender_id != ?";
        db.query(sql, [roomId, userId], callback);
    }
};

module.exports = ChatMessage;