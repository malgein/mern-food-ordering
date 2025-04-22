// Componente qye representa el perfil del usuario muestra lo que debe mostrar dependiendo si hay o no un usuario, o un spinner o el formulario para modificar informacion del usuario
import UserProfileForm from "@/forms/user-profile-form/userProfileForm";
import { useUpdateMyUser, useGetMyUser } from "@/api/MyUserApi";

const UserProfilePage = () => {

  const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

  // herramienta traida de React query para buscar un usuario actual meintras lo hace lanza el sig mensaje
  if (isGetLoading) {
    return <span>Loading...</span>;
  }

  //  Si no hay usuario que mostrar se lanza el sig mensaje
  if (!currentUser) {
    return <span>Unable to load user profile</span>;
  }

  // si hay usuario se muestra el perfil del usuario
  return (
    // Se muetra el formulario para modificar el usuario
    <UserProfileForm 
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  )
}

export default UserProfilePage