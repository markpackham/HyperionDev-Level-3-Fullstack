const checkEmailMiddleware = (req, res, next) => {
  // Regular Expression for @gmail.com
  const emailRegex = /@gmail.com$/;

  if (!emailRegex.test(username)) {
    res.send({ message: `403 Error Email must @gmail.com` });
    res.status(403);
  }

  next();
};

module.exports = { checkEmailMiddleware };
