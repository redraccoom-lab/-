
const product_imagesModel = require("../models/product_imagesModel");

// 상품별 이미지 목록 조회

exports.getImagesByProduct = (req, res) => {
    const { productId } = req.params;

    product_imagesModel.findByProductId(productId, (err, results) => {
        if (err) {
            console.error("이미지 조회 중 에러:", err.message);
            return res.status(500).json({ error: "이미지 목록을 불러오지 못했습니다." });
        }
        res.json(results);
    });
};

// 이미지 정보 등록

exports.addImage = (req, res) => {
    const { product_id, image_url } = req.body;

    if (!product_id || !image_url) {
        return res.status(400).json({ error: "상품 ID와 이미지 경로는 필수입니다." });
    }

    product_imagesModel.create(req.body, (err, results) => {
        if (err) {
            console.error("이미지 등록 중 에러:", err.message);
            return res.status(500).json({ error: "이미지 등록에 실패했습니다." });
        }
        res.status(201).json({ message: "이미지 등록 성공", imageId: results.insertId });
    });
};

// 이미지 정보 삭제
exports.removeImage = (req, res) => {
    const { id } = req.params;

    product_imagesModel.delete(id, (err, results) => {
        if (err) {
            console.error("이미지 삭제 중 에러:", err.message);
            return res.status(500).json({ error: "이미지 삭제에 실패했습니다." });
        }
        res.json({ message: "이미지 삭제 완료" });
    });
};