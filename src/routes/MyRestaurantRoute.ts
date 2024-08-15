import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

// /api/my/restaurant
router.get("/", jwtCheck, jwtParse, MyRestaurantController.getMyRestaurant);

router.post(
  "/",
  jwtCheck,
  jwtParse,
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  MyRestaurantController.createMyRestaurant
);
router.put(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  MyRestaurantController.updateMyRestaurant
);

export default router;
