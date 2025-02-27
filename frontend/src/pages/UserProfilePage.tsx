// Componente qye representa el perfil del usuario muestra lo que debe mostrar depensiendo si hay o no un usuario, o un spinner o el formulario para modificar informacion del usuario
import UserProfileForm from "@/forms/user-profile-form/userProfileForm";
import { useUpdateMyUser } from "@/api/MyUserApi";

const UserProfilePage = () => {

  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

  return (
    <UserProfileForm 
      // currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  )
}

export default UserProfilePage