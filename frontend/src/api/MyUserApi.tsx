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
      method: "POST",
      headers: {
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
