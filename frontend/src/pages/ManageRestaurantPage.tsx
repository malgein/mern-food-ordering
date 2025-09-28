import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm"
import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  // useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";

const ManageRestaurantPage = () => {
	
	const { restaurant } = useGetMyRestaurant();

	// Renombramos las variables isLoading con otros nombres descriptivos debido a diversas variables usadas con el mismo nombre en este archivo
	const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();

	const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant();

	// Determina si vamos a crear o a editar la variable
	const isEditing = !!restaurant;

	return (
		<div>
			<ManageRestaurantForm 
			// Mediante isEditing determinamos si vamos a crear o a editar el restaurante
			onSave={isEditing ? updateRestaurant : createRestaurant} 
			// O estamos creando o estamos editando
			isLoading={isCreateLoading || isUpdateLoading} restaurant={restaurant}/>
		</div>
	)
}

export default ManageRestaurantPage
