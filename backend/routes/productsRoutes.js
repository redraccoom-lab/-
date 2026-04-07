const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

// 전체 목록 조회
router.get("/", productsController.getAllProducts);

// 상품 상세 조회
router.get("/:id", productsController.getProductDetail);

// 상품 등록
router.post("/", productsController.registerProduct);

module.exports = router;