const likesModel = require("../models/likesModel");

// like 목록 전체 불러오기
exports.getMyLikesList = (req, res) => {
    const { userId } = req.params;

    likesModel.findByUserId(userId, (err, results) => {
        if (err) {
            console.error("찜 목록 조회 중 에러 발생:", err.message);
            return res.status(500).json({ error: "찜 목록을 불러오는 데 실패했습니다." });
        }
        res.json(results);
    });
};

// like 추가 
exports.toggleLike = (req, res) => {
    const { user_id, product_id } = req.body;

    if (!user_id || !product_id) {
        return res.status(400).json({ error: "유저 ID와 상품 ID는 필수입니다." });
    }

    // like 중복 확인
    likesModel.checkIfExists(user_id, product_id, (err, existing) => {
        if (err) return res.status(500).json({ error: "중복 체크 중 에러 발생" });

        if (existing.length > 0) {
            return res.status(409).json({ message: "이미 찜한 상품입니다." });
        }

        // 목록에 추가
        likesModel.create(user_id, product_id, (err, results) => {
            if (err) return res.status(500).json({ error: "찜하기 등록 실패" });
            res.status(201).json({ message: "찜하기 성공!" });
        });
    });
};

// like 삭제
exports.removeLike = (req, res) => {
    const { user_id, product_id } = req.body;

    likesModel.delete(user_id, product_id, (err, results) => {
        if (err) {
            console.error("찜 취소 중 에러:", err.message);
            return res.status(500).json({ error: "찜 취소에 실패했습니다." });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "해당 찜 정보를 찾을 수 없습니다." });
        }

        res.json({ message: "찜 취소 완료!" });
    });
};