import React from 'react'
import Auth0ProviderWithNavigate from "./auth/AuthProviderWithNavigate"
import ReactDOM from 'react-dom/client'
import './global.css'
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from './AppRoutes';
// Archivo de autenticacion de auth0

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Auth0ProviderWithNavigate>
        <AppRoutes />
      </Auth0ProviderWithNavigate>
    </Router>
  </React.StrictMode>,
)
