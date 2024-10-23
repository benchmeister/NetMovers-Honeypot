
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config.js");

var check = (req, res, next) => {
  console.log("------------------------------");
  console.log("isLoggedInMiddleware.js::check()...");
  console.log("------------------------------");
  console.log(req.headers);

  const authHeader = req.headers.authorization;

  if (authHeader === null || authHeader === undefined || 
  !authHeader.startsWith("Bearer ")) {

    res.status(401).send();
    return;
  }

  const token = authHeader.replace("Bearer ", "");

  jwt.verify(
    token, 
    JWT_SECRET.key, 
    { algorithms: ["HS256"] }, 
    function (error, decodedToken) {
      if (error) {
          console.log("isLoggedInMiddleware.js::check::token verification failed")
        res.status(401).send();
        return;
      }
    req.decodedToken = decodedToken;
    next();
  });
};

module.exports = check;
