const categoryModel = require("../models/categoryModel");

//사용자가 조회만 가능하게끔 get만
exports.getCategoryList = (req, res) => {
    categoryModel.findAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};