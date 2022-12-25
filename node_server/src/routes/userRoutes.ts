import { Router } from "express";
import {
  postInitUser,
  putUserSBT,
  putEditUser,
  getAllUsers,
  getUserById
} from "../controllers/userController";
const router = Router();


router
  .route("/")
  .post(postInitUser)
  .get(getAllUsers)

router.route("/:id")
  .get(getUserById)
  .put(putUserSBT);
router.route("/edit/:id")
  .put(putEditUser);

export default router;