"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var OrgController_1 = require("../controllers/OrgController");
var router = (0, express_1.Router)();
// 同一个路由 url，请求方法不同 , 对应的处理函数也不同 ;
router
    .route("/")
    .post(OrgController_1.postInitOrg)
    .get(OrgController_1.getAllOrgs);
router
    .route("/:id")
    .put(OrgController_1.putOrgCollection);
/*
  router.route("/:id/update")
  .get(updateWord);

// 获取认知度排名最低的 N 个 Master 单词
router.route("/topN")
  .get(getCognitionTopN);
router.route("/info/:id")
  .get(getExtraInfo);
router.route("/:id/addition")
  .get(getOneWord)
  .put(addWordExtension);
router.route("/recogn")
  .put(putRecogn);
router.route("/check")
  .post(checkWordsExistence);
*/
exports.default = router;
