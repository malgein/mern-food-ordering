import express, { Request, Response } from "express";
// importamos los cors
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
// Importamos el sistema de rutas
import myUserRoute from "./routes/MyUserRoutes";
import myRestaurantRoute from "./routes/MyRestaurantRoutes"
// Dependencia para el almacenamiento de archivos tipo imagenes
import { v2 as cloudinary } from "cloudinary";

// Hacemos la conexion con la BD
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => console.log("Connected to database!"));

// Configuramos el cloudinary para su uso
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


const app = express();

app.use(cors());

app.use(express.json());

// Ruta de pruebas para probar el servidor
app.get("/test", async (req: Request, res: Response) => {
    res.json({message: "hello!"})
})

// Ruta de inicio para acciones que tengan que ver con los usuarios
app.use("/api/my/user", myUserRoute);

// Ruta del servidor que lleva a cabo acciones en relacion con los restaurantes 
app.use("/api/my/restaurant", myRestaurantRoute);


// Prendemos el servidor como tal
app.listen(7000, () => {
    console.log("server started on localhost:7000");
  });