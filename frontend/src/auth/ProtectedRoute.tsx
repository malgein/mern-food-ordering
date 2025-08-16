import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    // Tomamos las propiedades de isAuthenticated e isLoading de useAuth0 para determinar si estamos autenticados o no y mientras si la aplicacion esta buscando dichos datos para el isLoading
  const { isAuthenticated, isLoading } = useAuth0();

//   Si no esta autenticado entonces retorna null
// ? Parte del codigodonde podemos colocar un spiner para que se vea mientras carga la pagina 
  if (isLoading) {
    return null;
  }

//   Si esta autenticado continuamos con lo que sea que este dentro de la ruta protegida
  if (isAuthenticated) {
    return <Outlet />;
  }
  // Si no esta autenticado el usuario simplemente retornara al homepage8
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;