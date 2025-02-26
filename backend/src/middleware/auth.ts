// Archivo que sirve como middleware  de autenticado de usuarios para la app
// Se usa en funciones basicas de la app como al crear  usuario autenticado por google o actualizar informacion de usuarios mediante autenticacion por google 

import { auth } from "express-oauth2-jwt-bearer";
import User from "../models/user";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// configuracion de typescript para arreglar los problemas con el tipado en las variables req.authID y req.userId
declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

// codigo copiado de la seccion api de auth0 para crear nuestra api de auth0
// jwtCheck es el middleware que usamos como intermediario en la ruta para crear nuevos usuarios en la DB al autenticar con google tambien en la ruta para modificar informacion de usuarios
export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256'
});

// jwtParse es el middleware que usamos coomo intermediario en la ruta para modificar informacion de usuarios autenticados por google
export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => { //authorization seria el token que llega mediante los headers
  const { authorization } = req.headers;

  // Si el token no existe o el token no empieza con "Bearer" significa que o no hay token o el token nos velido
  if (!authorization || !authorization.startsWith("Bearer ")) {
    // por lo tango respondemos con un mensaje not found
    return res.sendStatus(401);
  }

  // Bearer lshdflshdjkhvjkshdjkvh34h5k3h54jkh
  // este es el token lo separaremos en un array
  const token = authorization.split(" ")[1];

  try {
    // desciframos el token
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    const auth0Id = decoded.sub;

    // buscamos el usuario en la DB mediante el token decodeado
    const user = await User.findOne({ auth0Id });

    // Si no hay usuario en la bsase de datos mediante ese token enviamos un mensaje de no autorizado
    if (!user) {
      return res.sendStatus(401);
    }

    req.auth0Id = auth0Id as string;
    req.userId = user._id.toString();
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};

