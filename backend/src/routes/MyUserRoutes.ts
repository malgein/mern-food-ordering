// Ruta de manejo de usuario
import express from "express";
// Controladores de usuario importados
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
// Validaciones correspondientes
import { validateMyUserRequest } from "../middleware/validations";



const router = express.Router();

// /api/my/user
// AQui usuamos cmo middleware a auth0 a traves de jwtCheck, y mediante getCurrentUser obtenemos informacion del usuario en cuestion aquel que esta logeado 
router.get("/", jwtCheck, jwtParse, MyUserController.getCurrentUser);

// AQui usuamos cmo middleware a auth0 a traves de jwtCheck,  tambien colocamos el controlador creacteCurrentUser en la ruta principal para crear usuarios
router.post("/", jwtCheck,  MyUserController.createCurrentUser);

// AQui usuamos cmo middleware a auth0 a traves de jwtCheck, y mediante authParse , tambien esta el controlador que permite modificar ;a informacion de usuarios
router.put( "/", jwtCheck, jwtParse, validateMyUserRequest, MyUserController.updateCurrentUser);

export default router;



