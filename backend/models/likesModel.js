const db = require("../config/db");

/**
 * 엔티티 구조
 * - user_id: INT (PK) - 유저 ID
 * - product_id: INT (PK) - 상품 ID
 * - created_at: DATETIME - like한 시간
 */

const likes = {
    // 유저 like 목록 전체 조회 (상품 정보 JOIN)
    findByUserId: (userId, callback) => {
        const sql = `
            SELECT l.*, p.title, p.price, p.image_url 
            FROM likes l
            JOIN products p ON l.product_id = p.id
            WHERE l.user_id = ?
            ORDER BY l.created_at DESC
        `;
        db.query(sql, [userId], callback);
    },

    // like 추가
    create: (userId, productId, callback) => {
        const sql = "INSERT INTO likes (user_id, product_id) VALUES (?, ?)";
        db.query(sql, [userId, productId], callback);
    },

    // like 삭제
    delete: (userId, productId, callback) => {
        const sql = "DELETE FROM likes WHERE user_id = ? AND product_id = ?";
        db.query(sql, [userId, productId], callback);
    },

    // like 중복 방지
    checkIfExists: (userId, productId, callback) => {
        const sql = "SELECT * FROM likes WHERE user_id = ? AND product_id = ?";
        db.query(sql, [userId, productId], callback);
    }
};

module.exports = likes;