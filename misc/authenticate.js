const jwt = require("jsonwebtoken");
const { jwtKey } = require("../secret.json");

module.exports = authenticateToken = (req, res, next) => {
  const authH = req.headers["authorization"];
  if (!authH) return res.status(401).json({ message: "Unauthorised" });
  const token = authH.split(" ")[1];

  try {
    const decrypted = jwt.verify(token, jwtKey);
    req.body.userId = decrypted._id;
    console.log(decrypted);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorised" });
  }
};
