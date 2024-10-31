import React from 'react'
import { Button } from './ui/button'
//Provedor de autenticacion
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import UsernameMenu from './UsernameMenu';

//*Componente para el login del nav
const MainNav= () => {

	//  isAuthenticated  un elemento de useAuth0 determina si el usuario actual esta autenticaco o no
	const { loginWithRedirect, isAuthenticated  } = useAuth0();

	return (
		<span className="flex space-x-2 items-center">
			{/* Si el usuario se encuentra autenticado */}
			{isAuthenticated ? (
				<>
				{/* Entonces mostramos un boton con el estatus de su orden */}
					 <Link to="/order-status" className="font-bold hover:text-orange-500">
            Order Status
          </Link>
					 {/* Y tambien el menu de usuario autenticado */}
					<UsernameMenu />
				</>
			) : (
				// Si no esta autenticado entonces mostramos el boton para login que lo llevara a autenticar con google
				<Button  variant="ghost"
				className="font-bold hover:text-orange-500 hover:bg-white"
				onClick={async () => await loginWithRedirect()}
					>Log In
				</Button>
			)}
		</span>
	)
}

export default MainNav 