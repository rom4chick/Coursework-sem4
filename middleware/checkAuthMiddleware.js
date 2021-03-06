const SECRET_KEY = 'sEcRet key';
const jwt = require('jsonwebtoken');

module.exports = function (req, res , next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1] // [0] - тип токена, [1] - сам токен 

    if (!token) {
      return res.status(401).json({message: "Пользователь не авторизован"});
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch(e) {
    res.status(401).json({message: "Пользователь не авторизован"});
  }
}