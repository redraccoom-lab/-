const db = require("../config/db");

/**
 * 엔티티 구조
 * - id: INT (PK, AI) - 고유 번호
 * - product_id: INT (NN) - 연결된 상품 ID
 * - image_url: VARCHAR(255) (NN) - 이미지 URL
 * - created_at: DATETIME (Default: CURRENT_TIMESTAMP)
 */

const product_images = {
    // 모든 이미지 조회
    findByProductId: (productId, callback) => {
        const sql = "SELECT * FROM product_images WHERE product_id = ? ORDER BY id ASC";
        db.query(sql, [productId], callback);
    },

    // 새 이미지 url
    create: (imageData, callback) => {
        const { product_id, image_url } = imageData;
        const sql = "INSERT INTO product_images (product_id, image_url) VALUES (?, ?)";
        db.query(sql, [product_id, image_url], callback);
    },

    // 이미지 삭제
    delete: (id, callback) => {
        const sql = "DELETE FROM product_images WHERE id = ?";
        db.query(sql, [id], callback);
    }
};

module.exports = product_images;