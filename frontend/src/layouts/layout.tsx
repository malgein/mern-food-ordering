import React from 'react'
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

type Props = {
  // children hace referencia a que Layout seria un componente con doble tag y los children serian otros componentes dentro de el
    children: React.ReactNode;
    // El simbolo de interrogacion significa que el prop es opcional
    // Como dice su nombre este prop es un indicador si mostramos o no el componente Hero
    showHero?: boolean; 
  };
// Seteamos por defecto el valor de showHero en false sera true si tan solo lo pasamos cmo prop donde sea que lo usemos

const Layout = ({ children, showHero = false }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Componente que contiene el nav el login y el titulo de la app */}
        <Header />
        {/* Componente que contiene la landing page como tal */}
        {showHero && <Hero />}
			<div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout