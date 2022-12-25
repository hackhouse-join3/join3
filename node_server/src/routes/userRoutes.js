"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController_1 = require("../controllers/userController");
var router = (0, express_1.Router)();
router
    .route("/")
    .post(userController_1.postInitUser)
    .get(userController_1.getAllUsers);
router.route("/:id")
    .get(userController_1.getUserById)
    .put(userController_1.putUserSBT);
router.route("/edit/:id")
    .put(userController_1.putEditUser);
exports.default = router;
