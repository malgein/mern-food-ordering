import React from 'react'
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from './ui/sheet'
import { CircleUserRound, Menu } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from './ui/button';
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from './MobileNavLinks';

//Componente modal que se abre cuando la app esta en modo movil para una opcion de login en un responsive
function MobileNav() {

	// Tomamos el is Autenticated, el de logear con terceros, y del usuario como tal
	const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  return (
    <Sheet>
      <SheetTrigger>
				<Menu className="text-orange-500" />
			</SheetTrigger>
			<SheetContent>
				<SheetTitle>
				{isAuthenticated ? (
            <span className="flex items-center font-bold gap-2">
              <CircleUserRound className="text-orange-500" />
              {user?.name}
            </span>
          ) : (
            <span> Welcome to MernEats.com!</span>
          )}
				</SheetTitle>
				<Separator />
				<SheetDescription className='flex flex-col gap-4'>
				{isAuthenticated ? (
            <MobileNavLinks />
          ) : (
            <Button
              onClick={() => loginWithRedirect()}
              className="flex-1 font-bold bg-orange-500"
            >
              Log In
            </Button>
          )}
				</SheetDescription>
			</SheetContent>
    </Sheet>
  )
}

export default MobileNav