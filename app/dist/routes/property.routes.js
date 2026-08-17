"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Property_controller_1 = require("../controllers/Property.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authMiddleware, Property_controller_1.createProperty);
router.get("/:id", Property_controller_1.getProperty);
exports.default = router;
//# sourceMappingURL=property.routes.js.map