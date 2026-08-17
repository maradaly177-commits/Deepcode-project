"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_controller_1 = require("../controllers/User.controller");
const user_validator_1 = require("../validators/user.validator");
const router = (0, express_1.Router)();
router.post("/register", user_validator_1.validateUser, User_controller_1.register);
router.post("/login", user_validator_1.validateUser, User_controller_1.login);
exports.default = router;
//# sourceMappingURL=user.routes.js.map