const checkEmailMiddleware = (req, res, next) => {
  // Regex for @gmail.com
  const emailRegex = /@gmail.com$/;

  const { username } = req.body;

  if (!emailRegex.test(username)) {
    res.status(403).json({ message: "403 Error Email must @gmail.com" });
  }

  next();
};

module.exports = { checkEmailMiddleware };
