const db = require("../config/db");

// 전체 조회
exports.findAll = (callback) => {
    db.query("SELECT * FROM users", callback);
};

// 단건 조회
exports.findById = (id, callback) => {
    db.query("SELECT * FROM users WHERE id = ?", [id], callback);
};

// 이메일 조회 (로그인용)
exports.findByEmail = (email, callback) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], callback);
};

// 회원가입
exports.create = (user, callback) => {
    const sql = `
        INSERT INTO users 
        (email, password, nickname, role, profile_image, address, latitude, longitude)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
        user.email,
        user.password,
        user.nickname,
        user.role || "user",
        user.profile_image || null,
        user.address || null,
        user.latitude || null,
        user.longitude || null
    ];

    db.query(sql, params, callback);
};

// 수정
exports.update = (id, user, callback) => {
    const sql = `
        UPDATE users 
        SET nickname=?, address=?, latitude=?, longitude=? 
        WHERE id=?
    `;

    db.query(sql, [
        user.nickname,
        user.address,
        user.latitude,
        user.longitude,
        id
    ], callback);
};

// 삭제
exports.remove = (id, callback) => {
    db.query("DELETE FROM users WHERE id=?", [id], callback);
};