const commentsModel = require("../models/commentsModel");

// 댓글 목록 조회
exports.getCommentsByProduct = (req, res) => {

    const { productId } = req.params;

    commentsModel.findByProductId(productId, (err, results) => {
        if (err) {
            console.error("댓글 조회 에러:", err.message);
            return res.status(500).json({ error: "댓글을 불러오는 중 오류가 발생했습니다." });
        }
        res.json(results);
    });
};

// 댓글 등록
exports.addComment = (req, res) => {
    const { product_id, writer_id, content } = req.body;

    if (!content || content.trim() === "") {
        return res.status(400).json({ error: "댓글 내용을 입력해주세요." });
    }

    commentsModel.create(req.body, (err, results) => {
        if (err) {
            console.error("댓글 등록 에러:", err.message);
            return res.status(500).json({ error: "댓글 등록에 실패했습니다." });
        }
        res.status(201).json({
            message: "댓글이 등록되었습니다.",
            commentId: results.insertId
        });
    });
};

// 댓글 삭제
exports.removeComment = (req, res) => {

    const { id } = req.params;

    commentsModel.delete(id, (err, results) => {
        if (err) {
            console.error("댓글 삭제 에러:", err.message);
            return res.status(500).json({ error: "댓글 삭제 중 오류가 발생했습니다." });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "삭제할 댓글을 찾을 수 없습니다." });
        }

        res.json({ message: "댓글이 성공적으로 삭제되었습니다." });
    });
};