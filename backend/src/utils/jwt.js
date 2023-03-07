const secret = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");

exports.generateToken = async (data) => {
   const token = jwt.sign({ data: data }, secret);

   return token;
};

exports.tokenVerification = async (token) => {
   const secretKey = process.env.SECRET_KEY;
   return jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
         return error;
      } else {
         return decoded;
      }
   });
};
