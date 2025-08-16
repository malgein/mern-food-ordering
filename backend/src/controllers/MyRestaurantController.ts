import { Request, Response } from "express";
// Modelo del restaurant
import Restaurant from "../models/restaurant";
// Importamos cloudinary para el almacenamiento de imagnes de restaurant
import cloudinary from "cloudinary";
import mongoose from "mongoose";
// import Order from "../models/order";

// funcion que permite subir imagenes a cloudinary a traves de multer y express js
const uploadImage = async (file: Express.Multer.File) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.url;
};

// controlador que maneja la logica de creacion de restaurantes por usuario
const createMyRestaurant = async (req: Request, res: Response) => {
    try {
			// Verificamos que exista una restaurante creado por el usuario en cuestion
      const existingRestaurant = await Restaurant.findOne({ user: req.userId });
  
			// Si existe un restaurante creado por el usuaio enviamos un mensaje de ya existe uno creado con este usuario, solo podemos crear un restaurante por usuario usando esta app
      if (existingRestaurant) {
        return res
				// codigo 409 implica duplicado
          .status(409)
          .json({ message: "User restaurant already exists" });
      }
			// el url de la imagen del restaurante sera obtenida mediante la funcion siguiente y la guardamos en la var imageUrl
      const imageUrl = await uploadImage(req.file as Express.Multer.File);
  
			// creamos un nuevo restaurant en  la BD  en la tabla Restaurant
      const restaurant = new Restaurant(req.body);
			// Establecemos como propiedad  imageUrl del restaurante creado el valor de imageUrl que seria la url del restaurante gurdada en cloudinary
      restaurant.imageUrl = imageUrl;
      // Estblecemos la propiedad de usuario del modelo restaurant en el id del usuario que esta creeando el restaurant relacionando el usuario con el restaurante creado
      restaurant.user = new mongoose.Types.ObjectId(req.userId);
      // modificamos la propiedad lastUpdate de restaurant con la fecha actual para dejar un registro en la DB
      restaurant.lastUpdated = new Date();
      // guardamos finalmente el restauramte creado en la DB
      await restaurant.save();
      // Tambien al final devolvemos el restaurante creado
      res.status(201).send(restaurant);
			// Si algo sale mal a nivel de servidor informamos el error
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

  const getMyRestaurant = async (req: Request, res: Response) => {
    try {
      // Busca un restaurante en la base de datos que esté asociado al usuario autenticado
      // req.userId se asume que fue agregado por un middleware de autenticación previo
      const restaurant = await Restaurant.findOne({ user: req.userId });
  
      // Si no se encuentra ningún restaurante para este usuario, se devuelve un error 404
      if (!restaurant) {
        return res.status(404).json({ message: "restaurant not found" });
      }
  
      // Si se encuentra, se envía el objeto restaurante como respuesta en formato JSON
      res.json(restaurant);
    } catch (error) {
      // Si ocurre un error inesperado, se registra en consola
      // console.log("error", error);
  
      // Y se responde con un código 500 indicando error interno del servidor
      res.status(500).json({ message: "Error fetching restaurant" });
    }
  };
  
  // Este controlador sirve para editar un restaurante ya existente en la base de datos
  const updateMyRestaurant = async (req: Request, res: Response) => {
    try {
      // Busca en la base de datos el restaurante asociado al usuario autenticado
      const restaurant = await Restaurant.findOne({
        user: req.userId,
      });
  
      // Si no se encuentra un restaurante, devuelve un error 404
      if (!restaurant) {
        return res.status(404).json({ message: "restaurant not found" });
      }
  
      // Actualiza los campos del restaurante con los datos enviados en el cuerpo de la petición
      restaurant.restaurantName = req.body.restaurantName;
      restaurant.city = req.body.city;
      restaurant.country = req.body.country;
      restaurant.deliveryPrice = req.body.deliveryPrice;
      restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
      restaurant.cuisines = req.body.cuisines;
      restaurant.menuItems = req.body.menuItems;
      restaurant.lastUpdated = new Date(); // Marca la fecha/hora de última modificación
  
      // Si el usuario envió un archivo (nueva imagen), la sube y actualiza la URL de la imagen
      if (req.file) {
        const imageUrl = await uploadImage(req.file as Express.Multer.File);
        restaurant.imageUrl = imageUrl;
      }
  
      // Guarda los cambios en la base de datos
      await restaurant.save();
  
      // Devuelve el restaurante actualizado con un estado 200
      res.status(200).send(restaurant);
    } catch (error) {
      // Captura errores y devuelve un error 500 con un mensaje genérico
      console.log("error", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  

	export default {
		// updateOrderStatus,
		// getMyRestaurantOrders,
		getMyRestaurant,
		createMyRestaurant,
		updateMyRestaurant,
	};