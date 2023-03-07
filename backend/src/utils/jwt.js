const secret = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");

exports.generateToken = async (data) => {
   const token = jwt.sign({ data: data }, secret);

   return token;
};
