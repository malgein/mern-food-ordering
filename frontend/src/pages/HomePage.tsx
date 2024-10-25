import React from 'react'
import landingImage from "../assets/landing.png"
import appDownloadImage from "../assets/appDownload.png"


const HomePage = () => {

  return (
		<div className="flex flex-col gap-12">
			{/* Eslogan y un poco mas sobre nuestra app de comida */}
			<div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
				<h1 className="text-5xl font-bold tracking-tight text-orange-600">
						Tuck into a takeway today
					</h1>
					<span className="text-xl">Food is just a click away!</span>
					{/* Justo aqui va el input par buscar por palabra clave */}
			</div>
			{/* parte del landing donde ilustra la aplicacion movil */}
			<div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway even faster!
          </span>
          <span>
            Download the MernEats App for faster ordering and personalised
            recommendations
          </span>
          <img src={appDownloadImage} />
        </div>
      </div>
		</div>
  )
}

export default HomePage