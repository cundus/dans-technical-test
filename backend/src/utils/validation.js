const joi = require("joi");

exports.loginSchema = joi.object({
   username: joi.string().min(4).max(12).required(),
   password: joi.string().min(6).required(),
});

exports.registerSchema = joi.object({
   name: joi.string().min(3).max(30).required(),
   username: joi.string().min(4).max(12).required(),
   password: joi.string().min(6).required(),
});
