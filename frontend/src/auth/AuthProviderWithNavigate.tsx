// Arcchivo necesario para la autenticacion con auth0 (el provedor autenticador para esta app)
import { useCreateMyUser } from "@/api/MyUserApi";
import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  // const navigate = useNavigate();

  const {createUser } = useCreateMyUser()

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  // const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  if (!domain || !clientId || !redirectUri) {
    throw new Error("unable to initialise auth");
  }

  const onRedirectCallback = (appState?: AppState, user?: User) => {
    // navigate(appState?.returnTo || "/auth-callback");
    // podemos ver la info del usuario que logea
    if(user?.sub && user?.email){

      //*IMPORTANTE *
      // Aqui si logeamos con auth0 usando google podemos crear a traves de la funcion createUser el usuario de google en nuestra base de datos en mongo
      createUser({auth0Id : user.sub, email: user.email})
    }

    console.log("USER", user)
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        // audience,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;