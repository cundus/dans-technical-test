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
      const secretKey = process.env.SECRET_KEY;
      const verification = jwt.verify(token, secretKey, (error, decoded) => {
         if (error) {
            return res.status(403).send({
               status: "failed",
               message: "user not authenticated",
            });
         } else {
            return decoded;
         }
      });

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
