const productsModel = require("../models/productsModel");

// 위치기반 5km 반경 전체 상품 목록 가져오기
exports.getAllProducts = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // 위도, 경도 (없으면 에러)
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);

    if (!lat || !lng) {
        return res.status(400).json({ error: "현재 위치(lat, lng) 정보가 필요합니다." });
    }

    const radius = 5;

    // 5km 이내 전체 개수 파악
    productsModel.countNearby(lat, lng, radius, (err, countResult) => {
        if (err) return res.status(500).json({ error: err.message });

        const totalItems = countResult[0].total;
        const totalPages = Math.ceil(totalItems / limit);

        // 거리순 정렬 상품 조회
        const params = { lat, lng, limit, offset };
        productsModel.findNearbyWithPaging(params, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });

            res.json({
                data: results,
                pagination: {
                    currentPage: page,
                    totalItems: totalItems,
                    totalPages: totalPages
                }
            });
        });
    });
};

// id기준 상품 상세 보기 (+ 조회수 증가)
exports.getProductDetail = (req, res) => {
    const { id } = req.params;

    // 상세 정보 조회 전 조회수부터 1 증가
    productsModel.updateViewCount(id, (err) => {
        if (err) console.error("조회수 업데이트 실패:", err.message);

        productsModel.findById(id, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.length === 0) return res.status(404).json({ error: "상품을 찾을 수 없습니다." });
            res.json(result[0]);
        });
    });
};

// 상품 등록하기
exports.registerProduct = (req, res) => {
    const { seller_id, category_id, title, content, price } = req.body;

    // 필수 항목 검증
    if (!seller_id || !category_id || !title || !price) {
        return res.status(400).json({ error: "필수 입력 항목이 누락되었습니다." });
    }

    productsModel.create(req.body, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "상품 등록 완료", productId: results.insertId });
    });
};