import React from 'react'
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

type Props = {
    children: React.ReactNode;
    showHero?: boolean;
  };

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Componente que contiene el nav el login y el titulo de la app */}
        <Header />
        {/* Componente que contiene la landing page como tal */}
        <Hero />
			<div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout