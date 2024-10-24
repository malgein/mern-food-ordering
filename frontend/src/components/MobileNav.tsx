import React from 'react'
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from './ui/sheet'
import { CircleUserRound, Menu } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from './ui/button';

//Componente modal que se abre cuando la app esta en modo movil para una opcion de login en un responsive
function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger>
				<Menu className="text-orange-500" />
			</SheetTrigger>
			<SheetContent>
				<SheetTitle>
					<span>Welcome to MernEats.com!</span>
				</SheetTitle>
				<Separator />
				<SheetDescription className='flex'>
					{/* boton de login en el modo responsive */}
					<Button className="flex-1 font-bold bg-orange-500">Log In</Button>
				</SheetDescription>
			</SheetContent>
    </Sheet>
  )
}

export default MobileNav