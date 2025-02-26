import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";

const AppRoutes = () => {
    return (
      <Routes>
        {/* El layout contiene todo lo visual de la app componente madre de todo lo visual dentro contiene en la  ruta main el componente HomePage
        Al pasarle el showHero a Layout es como si lo estuviesemos setiando en true
        */}
				<Route path="/" element={<Layout showHero>{<HomePage/>}</Layout>} />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
				<Route path="/user-profile" element={
          // User profilepage se refiere a la pagina que muestra el formulario para modificar informacion del usuario
          <Layout>
            <UserProfilePage />
          </Layout>
        } />
				<Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  };

	export default AppRoutes;
  