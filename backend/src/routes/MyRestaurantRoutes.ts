// Ruta de manejo de restaurante
import express from "express";
import multer from "multer";
// Controladores que contiene la logica en el manejo de restaurantes
import MyRestaurantController from "../controllers/MyRestaurantController";
// Validaciones correspondientes
import { jwtCheck, jwtParse } from "../middleware/auth";
// validaciones correspondientes para la creacion de restauramtes
import { validateMyRestaurantRequest } from "../middleware/validations";


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
// validaciones correspondientes para la creacion de restaurantes 
  validateMyRestaurantRequest,
  // Nos aseguramos de que el usuario se encuentre autenticado
  jwtCheck,
  jwtParse,
  MyRestaurantController.createMyRestaurant
);

// ruta para acceder a un restaurante en especifico
router.get("/", jwtCheck, jwtParse, MyRestaurantController.getMyRestaurant);

export default router;