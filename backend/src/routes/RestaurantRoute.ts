import express from "express";
import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";

const router = express.Router(); 
// Se crea un router de Express, que agrupa las rutas relacionadas con "restaurant".

// Ruta para obtener un restaurante específico según su ID
router.get(
  "/:restaurantId", // La URL debe contener un parámetro dinámico llamado restaurantId
  param("restaurantId") // Validación del parámetro usando express-validator
    .isString()         // Debe ser de tipo string
    .trim()             // Se eliminan espacios en blanco alrededor
    .notEmpty()         // No puede estar vacío
    .withMessage("RestaurantId paramenter must be a valid string"),
  RestaurantController.getRestaurant // <- Controlador que manejaría la lógica 
);

// Ruta para buscar restaurantes en una ciudad específica
router.get(
  "/search/:city", // La URL debe contener un parámetro dinámico llamado city
  param("city")    // Validación del parámetro
    .isString()    // Debe ser string
    .trim()        // Se eliminan espacios en blanco
    .notEmpty()    // No puede estar vacío
    .withMessage("City paramenter must be a valid string"),
  RestaurantController.searchRestaurant // <- Controlador que manejaría la lógica 
);

export default router;
// Se exporta el router para ser usado en el archivo principal de rutas o en app.ts
