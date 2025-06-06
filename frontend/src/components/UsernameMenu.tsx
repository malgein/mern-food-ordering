import React from 'react'
import { DropdownMenu,  
	DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger } from "./ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link} from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

// componente modal para mostrar el menu de usuario ya autenticado, se muestra si el usuario se encuantra logeado
const UsernameMenu = () => {

	// Extraemos las funcionalidades de usuario y de logout para hacer uso de ellas cuando sea necesarios
	const { user, logout } = useAuth0();

  // const navigate = useNavigate()

  // const loginOut = () => {
  //   logout()
  //   navigate('/')
  // }

	return (
		<DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-orange-500 gap-2">
        <CircleUserRound className="text-orange-500" />
        {user?.name}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link
            to="/manage-restaurant"
            className="font-bold hover:text-orange-500"
          >
            Manage Restaurant
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/user-profile" className="font-bold hover:text-orange-500">
            User Profile
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button
            onClick={() => logout()}
            className="flex flex-1 font-bold bg-orange-500"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
	)
}

export default UsernameMenu