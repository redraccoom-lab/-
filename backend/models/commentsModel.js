const db = require("../config/db");

/**
 * 엔티티 구조
 * - id: INT (PK, AI)
 * - product_id: INT (NN) - 상품 id
 * - writer_id: INT (NN) - 작성자
 * - content: TEXT (NN) - 댓글 내용
 * - created_at: DATETIME (Default: CURRENT_TIMESTAMP)
 */

const comments = {
    // 작성자 닉네임 JOIN 모든 댓글 조회
    findByProductId: (productId, callback) => {
        const sql = `
            SELECT c.*, u.nickname 
            FROM comments c
            JOIN users u ON c.writer_id = u.id
            WHERE c.product_id = ?
            ORDER BY c.created_at DESC
        `;
        db.query(sql, [productId], callback);
    },

    // 댓글 작성
    create: (commentData, callback) => {
        const { product_id, writer_id, content } = commentData;
        const sql = "INSERT INTO comments (product_id, writer_id, content) VALUES (?, ?, ?)";
        db.query(sql, [product_id, writer_id, content], callback);
    },

    // 댓글 삭제
    delete: (id, callback) => {
        const sql = "DELETE FROM comments WHERE id = ?";
        db.query(sql, [id], callback);
    }
};

module.exports = comments;