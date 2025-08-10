import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm"
import {
  useCreateMyRestaurant,
  // useGetMyRestaurant,
  // useGetMyRestaurantOrders,
  // useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";

const ManageRestaurantPage = () => {

	const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();

	return (
		<div>
			<ManageRestaurantForm onSave={createRestaurant} isLoading={isCreateLoading}/>
		</div>
	)
}

export default ManageRestaurantPage