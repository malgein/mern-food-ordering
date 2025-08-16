import { Order, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

// Base URL for the API, cargado desde variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Hook to fetch the current user's restaurant data.
 * Utiliza react-query para manejar el estado de la petición.
 */
export const useGetMyRestaurant = () => {
  // Obtener función para solicitar token de Auth0
  const { getAccessTokenSilently } = useAuth0();

  // Función interna que realiza la petición GET
  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    // Obtener token de acceso
    const accessToken = await getAccessTokenSilently();
		// console.log("Fetching restaurant with token", accessToken);
    // Realizar fetch a la ruta protegida
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Validar respuesta
    if (!response.ok) {
			console.error("Failed to fetch restaurant", response.status);
      throw new Error("Failed to get restaurant");
    }
    // Retornar datos parseados como JSON
    return response.json();
  };

  // useQuery para obtener datos, con key única y la función de petición
  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    getMyRestaurantRequest
  );

  // Devolver datos y estado de carga
  return { restaurant, isLoading };
};

/**
 * Hook para crear (POST) un nuevo restaurante.
 * Envía un FormData que incluye, entre otros, archivos de imagen.
 */
export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  // Función interna para la petición POST
  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
		console.log("Creating restaurant with data", restaurantFormData);

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
			console.error("Failed to create restaurant", response.status);
      throw new Error("Failed to create restaurant");
    }

		console.log("Created restaurant");
    return response.json();
  };

  // useMutation para manejar mutaciones: crear restaurante
  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyRestaurantRequest);

  // Mostrar notificaciones al usuario según resultado
  if (isSuccess) {
    toast.success("Restaurant created!");
  }

  if (error) {
    toast.error("Unable to update restaurant");
  }

  return { createRestaurant, isLoading };
};

/**
 * Hook para actualizar (PUT) los datos del restaurante.
 */
export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  // Función interna para petición PUT
  const updateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response) {
      throw new Error("Failed to update restaurant");
    }

    return response.json();
  };

  // useMutation para manejar la actualización
  const {
    mutate: updateRestaurant,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant Updated");
  }

  if (error) {
    toast.error("Unable to update restaurant");
  }

  return { updateRestaurant, isLoading };
};

/**
 * Hook para obtener los pedidos del restaurante.
 */
export const useGetMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  // Función interna para fetch de orders
  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    return response.json();
  };

  // useQuery para manejar la petición y estado
  const { data: orders, isLoading } = useQuery(
    "fetchMyRestaurantOrders",
    getMyRestaurantOrdersRequest
  );

  return { orders, isLoading };
};

// Tipo para petición de actualización de estado de un pedido
export type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};

/**
 * Hook para actualizar el estado de un pedido (PATCH).
 */
export const useUpdateMyRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  // Función interna para hacer PATCH al endpoint de status
  const updateMyRestaurantOrder = async (
    updateStatusOrderRequest: UpdateOrderStatusRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updateStatusOrderRequest.status }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update status");
    }

    return response.json();
  };

  // useMutation para actualizar el estado y mostrar notificaciones
  const {
    mutateAsync: updateRestaurantStatus,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateMyRestaurantOrder);

  if (isSuccess) {
    toast.success("Order updated");
  }

  if (isError) {
    toast.error("Unable to update order");
    reset();
  }

  return { updateRestaurantStatus, isLoading };
};
