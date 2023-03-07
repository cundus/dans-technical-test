const validation = require("../utils/validation");
const encrypt = require("../utils/encrypt");
const jwt = require("../utils/jwt");
const responds = require("../utils/responds");
const UserService = require("../service/user");

exports.login = async (req, res) => {
   try {
      const { username, password } = req.body;

      const { error: errValidation } = validation.loginSchema.validate(
         req.body
      );

      if (errValidation) {
         console.log(errValidation);
         return responds.failed(res, errValidation.details[0].message);
      }

      const user = await UserService.getUser({
         username: username.toLowerCase(),
      });

      if (!user) {
         return responds.failed(res, "Username atau password salah!");
      }

      const isValidPassword = await encrypt.compare(password, user.password);

      if (!isValidPassword) {
         return responds.failed(res, "Username atau password salah!");
      }

      const token = await jwt.generateToken(user);

      return responds.success(res, {
         message: "success login",
         data: { token },
      });
   } catch (error) {
      console.log("Error From ", error);
      return responds.error(res, error.message);
   }
};

exports.register = async (req, res) => {
   try {
      const { username, password, name } = req.body;

      const { error: errValidation } = validation.registerSchema.validate(
         req.body
      );

      if (errValidation) {
         return responds.failed(res, errValidation.details[0].message);
      }

      const user = await UserService.getUser({
         username: username.toLowerCase(),
      });

      if (user) {
         return responds.failed(
            res,
            `Username : ${username.toLowerCase()} telah digunakan!`
         );
      }

      const encryptedPassword = await encrypt.encrypt(password);

      await UserService.createUser({
         ...req.body,
         username: username.toLowerCase(),
         password: encryptedPassword,
      });

      return responds.success(res, {
         message: "Register berhasil, silakan login!",
      });
   } catch (error) {
      console.log("Error From ", error);
      return responds.error(res, error.message);
   }
};
