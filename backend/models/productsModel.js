const db = require("../config/db");

/**
 * 엔티티구조
 * - id: INT (PK, AI)
 * - seller_id: INT (NN) - 판매자 유저 ID
 * - category_id: INT (NN) - 카테고리 ID
 * - title: VARCHAR(100) (NN) - 상품 제목
 * - content: TEXT (NN) - 상품 상세 설명
 * - price: INT (NN) - 가격
 * - status: ENUM('selling', 'reserved', 'sold') - 판매 상태 (기본값: selling)
 * - view_count: INT - 조회수 (기본값: 0)
 * - trade_address: VARCHAR(255) - 거래 희망 장소 주소
 * - trade_latitude: DECIMAL - 거래 장소 위도
 * - trade_longitude: DECIMAL - 거래 장소 경도
 * - created_at: DATETIME
 * - updated_at: DATETIME
 */

const products = {

    // 위치기반 5km 반경 전체 상품 목록 조회 + 페이징 (카테고리명, 판매자 닉네임 포함)
    // limit - 한 페이지에 보여줄 개수
    // offset - 건너뛸 데이터 개수
    findNearbyWithPaging: (params, callback) => {

        const { lat, lng, limit, offset } = params;
        const radius = 5; // 5km 반경
        // 최신순 정렬
        const sql = `
            SELECT p.*, c.name as category_name, u.nickname as seller_nickname,
                (6371 * acos(
                    cos(radians(?)) * cos(radians(p.trade_latitude)) 
                    * cos(radians(p.trade_longitude) - radians(?)) 
                    + sin(radians(?)) * sin(radians(p.trade_latitude))
                )) AS distance
            FROM products p
            JOIN categories c ON p.category_id = c.id
            JOIN users u ON p.seller_id = u.id
            HAVING distance <= ?
            ORDER BY distance ASC
            LIMIT ? OFFSET ?
        `;

        db.query(sql, [lat, lng, lat, radius, limit, offset], callback);
    },

    // 반경 내 데이터 개수 (페이징 계산)
    countNearby: (lat, lng, radius, callback) => {
        const sql = `
            SELECT COUNT(*) as total FROM (
                SELECT (6371 * acos(
                    cos(radians(?)) * cos(radians(trade_latitude)) 
                    * cos(radians(trade_longitude) - radians(?)) 
                    + sin(radians(?)) * sin(radians(trade_latitude))
                )) AS distance
                FROM products
                HAVING distance <= ?
            ) AS nearby_count
        `;
        db.query(sql, [lat, lng, lat, radius], callback);
    },

    // 상품 상세 조회 (조회수 증가 로직은 컨트롤러에서 별도 호출)
    findById: (id, callback) => {
        const sql = `
            SELECT p.*, c.name as category_name, u.nickname as seller_nickname
            FROM products p
            JOIN categories c ON p.category_id = c.id
            JOIN users u ON p.seller_id = u.id
            WHERE p.id = ?
        `;
        db.query(sql, [id], callback);
    },

    // 새 상품 등록
    create: (productData, callback) => {
        const { seller_id, category_id, title, content, price, trade_address, trade_latitude, trade_longitude } = productData;
        const sql = `
            INSERT INTO products (seller_id, category_id, title, content, price, trade_address, trade_latitude, trade_longitude)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        db.query(sql, [seller_id, category_id, title, content, price, trade_address, trade_latitude, trade_longitude], callback);
    },

    // 조회수 증가
    updateViewCount: (id, callback) => {
        const sql = "UPDATE products SET view_count = view_count + 1 WHERE id = ?";
        db.query(sql, [id], callback);
    },

};

module.exports = products;