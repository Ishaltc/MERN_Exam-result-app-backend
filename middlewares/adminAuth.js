const jwt = require("JsonWebToken");

exports.authAdmin= async (req, res, next) => {
  try {
    const tmp = req.header("Authorization");
    
    const token = tmp ?tmp.slice(7, tmp.length) :"";
    if (!token) {
      return res.status(400).json({ message: "Invalid Authentication" });
    }
    jwt.verify(token, process.env.ADMIN_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json({ message: "Invalid Authentication" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: error?.message || "something went wrong"});
  }
};