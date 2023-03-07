const bcrypt = require("bcrypt");

exports.encrypt = async (data) => {
   const hashStrength = 10;
   return await bcrypt.hash(data, hashStrength);
};

exports.compare = async (first, second) => {
   return await bcrypt.compare(first, second);
};
