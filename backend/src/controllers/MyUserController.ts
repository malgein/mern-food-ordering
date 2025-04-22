import { Request, Response } from "express";
// modelo de usuario en la DB
import User from "../models/user";

// controlador para obtener el usuario actual, que esta logeado
const getCurrentUser = async (req: Request, res: Response) => {
  try {
    // guardamos en una variable el usuario de la bd que coincida con el id del usurio que estamos buscando 
    const currentUser = await User.findOne({ _id: req.userId });
    // si el usuario existe, lo devolvemos en la respuesta correspondiente
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
// Si existeel usuario simplemente lo devolvemos
    res.json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Controlador que busca el usuario mediante la autenticacion de terceros, si existe en la DB lo devuelve , si no lo crea nuevo
const createCurrentUser = async (req: Request, res: Response) => {
  try {
    // extraemos el usuario espexificamente el id que nos llega a traves del body
    const { auth0Id } = req.body;
    // Buscamos el usuario en la DB mediante el id que extrajimos previamente
    const existingUser = await User.findOne({ auth0Id });

    // si el usuario existe, lo devolvemos como respuesta final
    if (existingUser) {
      return res.status(200).send();
    }

    // Si el usuario no existe lo creamos mediante los datos introducidos
    const newUser = new User(req.body);
    // Guardamos el usuario en la DB
    await newUser.save();

    // toObject convierte un elemento de muchos datos en un objeto JS
    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    // Muestra el error al crear el usuario
    res.status(500).json({ message: "Error creating user" });
  }
};

// Controlador que se encargr de modificar el usuario actual sus datos, nombre, direccion y otros datos menos el email
const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    // Tomamos del body datos como el nombre, direccion , pais y ciudad
    const { name, addressLine1, country, city } = req.body;
    // Buscamos el usuario en la BD mediante el id de usuario
    const user = await User.findById(req.userId);

    // Si no tenemos usuario lanzamos el mensaje de usuario no encontrado
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Hacemos la modificaciones en la BD con los nuevos datos en sus propiedades
    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;
    // Guardamos la informacion modificada en la DB
    await user.save();

    // Devolvemos el usuario actualizado
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user" });
  }
};
 
export default {
  getCurrentUser,
  createCurrentUser,
  updateCurrentUser
};

