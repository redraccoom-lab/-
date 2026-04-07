const db = require("../config/db");

/**
 * 엔티티 구조
 * - id: INT (PK, AI) - 고유 번호
 * - name: VARCHAR(50) (NOT NULL) - 이름 
 * - icon_url: VARCHAR(255) (Nullable) - 아이콘 url
 * - created_at: TIMESTAMP (Default: CURRENT_TIMESTAMP) - 생성일
 */

const Category = {
    // 전체 카테고리 목록 조회
    findAll: (callback) => {
        const sql = "SELECT id, name, icon_url FROM categories ORDER BY id ASC";
        db.query(sql, callback);
    },

    // id 기준 카테고리 상세 정보
    findById: (id, callback) => {
        const sql = "SELECT * FROM categories WHERE id = ?";
        db.query(sql, [id], callback);
    },

    // (관리자용) 카테고리 추가
    create: (categoryData, callback) => {
        const { name, icon_url } = categoryData;
        const sql = "INSERT INTO categories (name, icon_url) VALUES (?, ?)";
        db.query(sql, [name, icon_url], callback);
    }
};

module.exports = Category;