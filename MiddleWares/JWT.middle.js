const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
  // 1. Lấy token từ Cookie đã ký (Signed Cookie)
  const token = req.signedCookies.accessToken;

  // Nếu không dùng Cookie mà gửi qua Header, dùng dòng dưới:
  // const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.redirect("/login"); // Hoặc res.status(401).json({ message: "Chưa đăng nhập" });
  }

  try {
    // 2. Giải mã và kiểm tra tính hợp lệ của Token
    const decodedPayload = jwt.verify(
      token, 
      process.env.JWT_SECRET || "JWT_SECRET_KEY_SECURE"
    );

    // 3. Gán Payload chứa thông tin phân quyền vào object `req.user`
    req.user = decodedPayload;

    // Chuyển tiếp sang controller xử lý tiếp theo
    next();
  } catch (error) {
    // Token hết hạn hoặc không hợp lệ
    res.clearCookie("accessToken");
    return res.redirect("/login");
  }
};