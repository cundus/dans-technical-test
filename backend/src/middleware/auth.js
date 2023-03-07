const jwt = require("../utils/jwt");

exports.auth = async (req, res, next) => {
   try {
      let header = req.header("Authorization");

      if (!header) {
         return res.status(401).send({
            status: "failed",
            message: "Access Failed",
         });
      }
      const token = header.replace("Bearer ", "");
      const verification = jwt.tokenVerification(token);

      req.userData = verification.id;

      next();
   } catch (error) {
      console.log(error);
      res.status(500).send({
         status: "failed",
         message: "Server Error",
      });
   }
};
