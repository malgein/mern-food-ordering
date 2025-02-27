// Archivo que sirve para el manejo de nuestras APIS del backend desde la aplicacion frontend

//*Importante
// Archivo que permite la creacion del usuario mediante autenticacion de terceros y al mismo tiempo crea el usuario en la BD

// Importamos React query
import { useMutation } from "react-query";
// Importamos auth0 la api que usamos para autenticar con terceros
import { useAuth0 } from "@auth0/auth0-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// tipado de typescript para el objeto CreateUserRequest
type CreateUserRequest = {
  auth0Id: string;
  email: string; 
};


export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    // Llamada a nuestra API en en backend que crea nuevos usuarios
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      // request tipo post
      method: "POST",
      headers: {
        // Utilizamos el token
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest);

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};

// Es una tabla de tipado typescript para formData que sera la ifnormacion que llega en forma de objeto del formulario para editar la informacion del usuario
type UpdateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

// funcion que va a hacer los llamados al backend para asi modificar la informacion del usuario
export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  // formData es la informacion que viene del formulaario de profilepage donde se edita la informacion del usuario
  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently();

    // Llamada a nuestra API en en backend que modifica usuarios
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      // convertimos en formato JSON la informacion
      body: JSON.stringify(formData),
    });

    // si la respuesta no es exitosa enviamos un mensaje de error
    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    // Enviamos la respuesta en formato JSOn
    return response.json();
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyUserRequest);

  if (isSuccess) {
    // toast.success("User profile updated!");
  }

  if (error) {
    // toast.error(error.toString());
    reset();
  }

  return { updateUser, isLoading };
};
