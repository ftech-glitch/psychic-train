const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  console.log("authUser");
  if (!("authorization" in req.headers)) {
    return res.status(400).json({
      status: "error",
      msg: "no token found",
    });
  }

  const token = req.headers["authorization"].replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      req.decoded = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ status: "error", msg: "not authroized" });
    }
  } else {
    return res.status(403).send({
      status: "error",
      msg: "missing token",
    });
  }
};

const authAdmin = (req, res, next) => {
  console.log("Current at authAdmin");
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", msg: "no token found" });
  }

  const token = req.headers["authorization"].replace("Bearer ", "");
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      console.log(decoded);
      if (decoded.userrole === "admin") {
        req.decoded = decoded;
        next();
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error.message);
      return res.status(401).json({ status: "error", msg: "unauthorised" });
    }
  } else {
    return res.status(403).json({ status: "error", msg: "missing token" });
  }
};

module.exports = { authUser, authAdmin };
