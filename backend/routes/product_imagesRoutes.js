const express = require("express");
const router = express.Router();
const product_imagesController = require("../controllers/product_imagesController");

// 이미지 가져오기
router.get("/product/:productId", product_imagesController.getImagesByProduct);

// 이미지 정보 추가
router.post("/", product_imagesController.addImage);

// 이미지 정보 삭제
router.delete("/:id", product_imagesController.removeImage);

module.exports = router;