"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var visGraphController_1 = require("../controllers/visGraphController");
var router = (0, express_1.Router)();
// 同一个路由 url，请求方法不同 , 对应的处理函数也不同 ;
router
    .route("/nodes")
    .get(visGraphController_1.getNode);
router
    .route("/edges")
    .get(visGraphController_1.getEdges);
exports.default = router;
