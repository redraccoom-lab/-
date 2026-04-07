const db = require("../config/db");

/**
 * 엔티티 구조
 * - id: INT (PK, AI) - 고유 번호
 * - product_id: INT (NN) - 상품 ID
 * - buyer_id: INT (NN) - 구매자 ID
 * - seller_id: INT (NN) - 판매자 ID
 * - created_at: DATETIME (Default: CURRENT_TIMESTAMP)
 */

const ChatRoom = {
    // 새로운 채팅방 생성 (채팅하기 버튼 클릭 시)
    create: (roomData, callback) => {
        const { product_id, buyer_id, seller_id } = roomData;
        const sql = "INSERT INTO chat_rooms (product_id, buyer_id, seller_id) VALUES (?, ?, ?)";
        db.query(sql, [product_id, buyer_id, seller_id], callback);
    },

    // 참여 중인 채팅방 목록 조회 (상품 정보, 상대 닉네임 포함)
    findByUserId: (userId, callback) => {
        const sql = `
            SELECT r.*, p.title as product_title, 
                   u.nickname as partner_name
            FROM chat_rooms r
            JOIN products p ON r.product_id = p.id
            JOIN users u ON (CASE WHEN r.buyer_id = ? THEN r.seller_id = u.id ELSE r.buyer_id = u.id END)
            WHERE r.buyer_id = ? OR r.seller_id = ?
            ORDER BY r.created_at DESC
        `;
        db.query(sql, [userId, userId, userId], callback);
    },

    // 중복인지 확인
    findExistingRoom: (product_id, buyer_id, callback) => {
        const sql = "SELECT id FROM chat_rooms WHERE product_id = ? AND buyer_id = ?";
        db.query(sql, [product_id, buyer_id], callback);
    }
};

module.exports = ChatRoom;