import React from 'react'
import hero from "../assets/hero.png";


// Componente que representa el landing page per se  contiene el cuerpo la  app principal
const Hero = () => {
	return (
		<div>
			{/* Imagen de fondo principal de la app  con su respectivo estilo responsivo */}
			<img src={hero} className="w-full max-h-[600px] object-cover" />
		</div>
	)
}

export default Hero