import { Request, Response } from "express";
import Restaurant from "../models/restaurant";

// Controlador para obtener un restaurante específico por ID
const getRestaurant = async (req: Request, res: Response) => {
  try {
    // Extrae el parámetro "restaurantId" de la URL
    const restaurantId = req.params.restaurantId;

    // Busca en la base de datos el restaurante con ese ID
    const restaurant = await Restaurant.findById(restaurantId);

    // Si no se encuentra, se devuelve un error 404
    if (!restaurant) {
      return res.status(404).json({ message: "restaurant not found" });
    }

    // Si existe, lo enviamos como respuesta en formato JSON
    res.json(restaurant);
  } catch (error) {
    // Captura y loguea cualquier error inesperado
    console.log(error);
    // Responde con un error 500 (interno del servidor)
    res.status(500).json({ message: "something went wrong" });
  }
};

// Controlador para buscar restaurantes por ciudad y filtros adicionales
const searchRestaurant = async (req: Request, res: Response) => {
  try {
    // Se obtiene la ciudad desde los parámetros de la URL
    const city = req.params.city;

    // Filtros adicionales que llegan como query params
    const searchQuery = (req.query.searchQuery as string) || ""; // búsqueda por nombre/cocina
    const selectedCuisines = (req.query.selectedCuisines as string) || ""; // cocinas seleccionadas
    const sortOption = (req.query.sortOption as string) || "lastUpdated"; // ordenamiento
    const page = parseInt(req.query.page as string) || 1; // paginación

    // Objeto base de consulta
    let query: any = {};

    // Filtrar por ciudad (case-insensitive usando regex)
    query["city"] = new RegExp(city, "i");

    // Verificamos si existen restaurantes en esa ciudad
    const cityCheck = await Restaurant.countDocuments(query);
    if (cityCheck === 0) {
      return res.status(404).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });
    }

    // Si hay cocinas seleccionadas, se agregan al query (todas deben coincidir con $all)
    if (selectedCuisines) {
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));

      query["cuisines"] = { $all: cuisinesArray };
    }

    // Si hay un término de búsqueda, se busca tanto en nombre como en cocinas
    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");
      query["$or"] = [
        { restaurantName: searchRegex },
        { cuisines: { $in: [searchRegex] } },
      ];
    }

    // Configuración de paginación
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    // Consulta final con ordenamiento, paginación y conversión a objetos planos
    const restaurants = await Restaurant.find(query)
      .sort({ [sortOption]: 1 }) // orden ascendente por la opción seleccionada
      .skip(skip)                // se omiten registros para la paginación
      .limit(pageSize)           // se limita al tamaño de página
      .lean();                   // devuelve objetos planos, más ligeros que documentos Mongoose

    // Contar el total de registros para armar la paginación
    const total = await Restaurant.countDocuments(query);

    // Estructuramos la respuesta con datos + info de paginación
    const response = {
      data: restaurants,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize), // total de páginas redondeado hacia arriba
      },
    };

    res.json(response);
  } catch (error) {
    // Manejo de errores inesperados
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  getRestaurant,
  searchRestaurant,
};
