const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// 로그인
exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "필수값 누락" });
    }

    userModel.findByEmail(email, async (err, results) => {
        if (err) return res.status(500).json({ message: "서버 오류" });

        if (results.length === 0) {
            return res.status(404).json({ message: "유저 없음" });
        }

        const user = results[0];

        try {
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: "비밀번호 틀림" });
            }

            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            res.json({
                message: "로그인 성공",
                token
            });

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "bcrypt 오류" });
        }
    });
};

// 회원가입
exports.insertUser = async (req, res) => {
    const { email, password, nickname } = req.body;

    if (!email || !password || !nickname) {
        return res.status(400).json({ error: "필수값 누락" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            email,
            password: hashedPassword,
            nickname
        };

        userModel.create(newUser, (err) => {
            if (err) return res.status(500).json({ error: "회원가입 실패" });
            res.status(201).json({ message: "회원가입 성공" });
        });

    } catch {
        res.status(500).json({ error: "암호화 실패" });
    }
};

// 내 정보
exports.me = (req, res) => {
    const userId = req.user.id;

    userModel.findById(userId, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "조회 실패" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "유저 없음" });
        }

        const user = results[0];

        // 🔥 보안 (비밀번호 제거)
        delete user.password;

        res.json(user);
    });
};

// 전체 조회
exports.getUserList = (req, res) => {
    userModel.findAll((err, results) => {
        if (err) return res.status(500).json({ error: "조회 실패" });

        const safe = results.map(u => {
            delete u.password;
            return u;
        });

        res.json(safe);
    });
};

// 단건 조회
exports.getUserById = (req, res) => {
    userModel.findById(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: "조회 실패" });

        if (results.length === 0) {
            return res.status(404).json({ message: "없음" });
        }

        const user = results[0];
        delete user.password;

        res.json(user);
    });
};

// 수정 (본인만)
exports.updateUser = (req, res) => {
    const id = Number(req.params.id);

    if (req.user.id !== id) {
        return res.status(403).json({ message: "본인만 수정 가능" });
    }

    userModel.update(id, req.body, (err) => {
        if (err) return res.status(500).json({ error: "수정 실패" });
        res.json({ message: "수정 성공" });
    });
};

// 삭제 (관리자만)
exports.deleteUser = (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "관리자만 삭제 가능" });
    }

    userModel.remove(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: "삭제 실패" });
        res.json({ message: "삭제 성공" });
    });
};