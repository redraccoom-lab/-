const jwt = require("jsonwebtoken");

// 🔐 토큰 검증
exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // 헤더 체크
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "토큰 없음 또는 형식 오류" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // user 정보 저장
        req.user = decoded;

        next();

    } catch (err) {
        console.error("JWT 오류:", err.message);
        return res.status(401).json({ message: "토큰 오류" });
    }
};

// 👤 로그인 사용자만 허용
exports.isAuthenticated = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "인증 필요" });
    }
    next();
};

// 👑 관리자만 허용
exports.isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "인증 필요" });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "관리자만 접근 가능" });
    }

    next();
};