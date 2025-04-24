// Ruta de manejo de restaurante
import express from "express";
import multer from "multer";
// Controladores que contiene la logica en el manejo de restaurantes
import MyRestaurantController from "../controllers/MyRestaurantController";
// Validaciones correspondientes
import { jwtCheck, jwtParse } from "../middleware/auth";


const router = express.Router();

// Configuracion para cloudinary
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb permite guardar
  },
});

// Ruta para crear restaurantes
router.post(
  "/",
	// Para almacenar las images con cloudinary
  upload.single("imageFile"),
  // validateMyRestaurantRequest,
  // jwtCheck,
  // jwtParse,
  MyRestaurantController.createMyRestaurant
);

export default router;