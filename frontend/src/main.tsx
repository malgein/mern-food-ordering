import React from 'react'
import Auth0ProviderWithNavigate from "./auth/AuthProviderWithNavigate"
import ReactDOM from 'react-dom/client'
import './global.css'
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import AppRoutes from './AppRoutes';
// Paquete para notificaciones
import { Toaster } from "sonner";
// Archivo de autenticacion de auth0

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <Auth0ProviderWithNavigate>
          {/* enrutado */}
          <AppRoutes />
          {/* Paquete para notificaciones contiene unos props para hacerlo mejor, top-right=  que las notificaciones aparezcan arriba a la derecha del usurio y richColors que el color cambien dependiendo de la natureleza de la notificacion si hubo un problema o si fue exitoso*/}
          <Toaster visibleToasts={1} position="top-right" richColors />
        </Auth0ProviderWithNavigate>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
)
