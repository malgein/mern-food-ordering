import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm"
import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  // useGetMyRestaurantOrders,
  // useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";

const ManageRestaurantPage = () => {
	
	const { restaurant } = useGetMyRestaurant();

	const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();

	return (
		<div>
			<ManageRestaurantForm onSave={createRestaurant} isLoading={isCreateLoading} restaurant={restaurant}/>
		</div>
	)
}

export default ManageRestaurantPage