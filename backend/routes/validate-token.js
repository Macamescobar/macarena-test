import jsonwebtoken from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ error: "You dont have access" });
  try {
    const verified = jsonwebtoken.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "Token is not valid" });
  }
};
