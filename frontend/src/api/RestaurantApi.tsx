// *Archivo que consiste en la comunicacion entre la api del backend y los archivos del frontend que buscan restaurantes por ciudad y otros filtros
// tanto Este como SearchPage se alimentan compartiendo funciones que se usan en ambos archivos
import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Hook para obtener un restaurante específico por su ID
export const useGetRestaurant = (restaurantId?: string) => {
  // Función que hace la petición al backend
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/${restaurantId}`
    );

    // Si la respuesta no es satisfactoria, lanzamos un error
    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    // Devolvemos el JSON del restaurante
    return response.json();
  };

  // useQuery de react-query maneja el estado de carga, caché y errores
  const { data: restaurant, isLoading } = useQuery(
    "fetchRestaurant",            // clave de la query para caching
    getRestaurantByIdRequest,     // función que ejecuta la petición
    {
      enabled: !!restaurantId,    // solo ejecuta si restaurantId está definido
    }
  );

  return { restaurant, isLoading };
};

// Hook para buscar restaurantes filtrando por ciudad y estado de búsqueda
export const useSearchRestaurants = (
searchState: SearchState,  // estado de búsqueda (texto, página, filtros)
  city?: string              // ciudad donde se busca
) => {
  // Función que arma la petición con los parámetros de búsqueda
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();

    // Se agregan los parámetros dinámicamente desde el estado
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);

    // Se hace la petición GET al endpoint del backend
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    // Devuelve la respuesta tipada como RestaurantSearchResponse
    return response.json();
  };

  // useQuery para manejar la búsqueda de restaurantes
  const { data: results, isLoading } = useQuery(
    ["searchRestaurants",searchState ], // clave única incluye el estado (para cachear distintas búsquedas)
    createSearchRequest,
    { enabled: !!city }                 // solo se ejecuta si se proporciona una ciudad
  );
  // console.log(results)
  return {
    results,   // resultados con data y paginación
    isLoading, // estado de carga para mostrar spinners, etc.
  };
};
