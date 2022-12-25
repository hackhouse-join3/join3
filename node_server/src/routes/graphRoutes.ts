import { Router } from "express";
import {
  getNode,
  getEdges
} from "../controllers/visGraphController";
const router = Router();


// 同一个路由 url，请求方法不同 , 对应的处理函数也不同 ;
router
  .route("/nodes")
  .get(getNode)

router
  .route("/edges")
  .get(getEdges)

export default router;