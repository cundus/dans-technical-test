const secret = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");

exports.generateToken = async (data) => {
   const token = jwt.sign({ data: data }, secret);

   return token;
};

exports.tokenVerification = async (token) => {
   const data = jwt.verify(token, secret, (error, decoded) => {
      if (error) {
         return error;
      } else {
         return decoded;
      }
   });

   return data;
};
