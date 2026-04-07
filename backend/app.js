require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./config/db");

// 라우터
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const chat_messagesRoutes = require("./routes/chat_messagesRoutes");
const chat_roomsRoutes = require("./routes/chat_roomsRoutes");
const commentsRoutes = require("./routes/commentsRoutes");
const likesRoutes = require("./routes/likesRoutes");
const product_imagesRoutes = require("./routes/product_imagesRoutes");
const productsRoutes = require("./routes/productsRoutes");

const app = express();

// 미들웨어
app.use(cors());
app.use(express.json());

// DB 연결 확인
db.getConnection((err, conn) => {
    if (err) {
        console.error("DB 연결 실패:", err);
    } else {
        console.log("DB 연결 성공");
        conn.release();
    }
});

// 테스트
app.get("/", (req, res) => {
    res.send("PickDeal Express 서버 실행 중");
});

// 라우팅
app.use("/api/user", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/chat_messages", chat_messagesRoutes);
app.use("/api/chat_rooms", chat_roomsRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/product_images", product_imagesRoutes);
app.use("/api/products", productsRoutes);

// 글로벌 에러 처리
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "서버 내부 오류" });
});

// 서버 실행
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});