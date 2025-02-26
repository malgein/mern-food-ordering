import express, { Request, Response } from "express";
// importamos los cors
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
// Importamos el sistema de rutas
import myUserRoute from "./routes/MyUserRoutes";

// Hacemos la conexion con la BD
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => console.log("Connected to database!"));


const app = express();

app.use(cors());

app.use(express.json());

// Ruta de pruebas para probar el servidor
app.get("/test", async (req: Request, res: Response) => {
    res.json({message: "hello!"})
})

// Ruta de inicio para acciones que tengan que ver con os usuarios
app.use("/api/my/user", myUserRoute);

// Prendemos el servidor como tal
app.listen(7000, () => {
    console.log("server started on localhost:7000");
  });