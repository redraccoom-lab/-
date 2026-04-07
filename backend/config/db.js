const mysql = require('mysql2');
require("dotenv").config(); // .env 파일 가져오기

const db = mysql.createPool({ // DB연결 객체생성, .env 파일 설정 가져오기
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 10, // 동시 연결 수
    waitForConnections: true, // 기다릴지 유무
    queueLimit: 0 // 최대 요청 개수 제한, 0은 무한대기
});


// 연결 확인
db.getConnection((err, connection) => {
    if (err) {
        console.error("DB 연결 실패:", err);
        return;
    }
    console.log("MySQL 연결 성공 (Connection Pool 사용 중)");
    connection.release();
});
module.exports = db;