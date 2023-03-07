const db = require("../config/index");
const initModels = require("../models/init-models");
const { user } = initModels(db);

exports.getUser = async (body) => {
   const data = await user.findOne({
      where: body,
      raw: true,
   });

   return data;
};
