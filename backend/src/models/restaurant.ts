// Schema de un restaurant
import mongoose, { InferSchemaType } from "mongoose";

// Schema de los items para la venta en el restaurant, es un arreglo de nombre del iten y precio de cada uno, al mismo tiempo es un campo del restaurant
const menuItemSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: () => new mongoose.Types.ObjectId(),
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

export type MenuItemType = InferSchemaType<typeof menuItemSchema>;

// Schema como tal del restaurant, a continuaciones cada propiedad del restaurant en cuestion
const restaurantSchema = new mongoose.Schema({
    // Hacemos una referencia al usuario que crea este restaurant, como una forma de relacionar el restaurante creadp com el usuario que lo crea
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  restaurantName: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  deliveryPrice: { type: Number, required: true },
//   tiempo que toma desde que deja el restaurant hasta el usuario
  estimatedDeliveryTime: { type: Number, required: true },
  cuisines: [{ type: String, required: true }],
//  Items del menu, es de tipo array es un schema definido anteriormente
  menuItems: [menuItemSchema],
	// url de la imagen del restaurant del cloudinary
  imageUrl: { type: String, required: true },
	// metricas que indican cuando se modifico la ultima vez el restaurant
  lastUpdated: { type: Date, required: true },
});

// Volvemos restaurante como un schema como tal
const Restaurant = mongoose.model("Restaurant", restaurantSchema);
// y lo exportamos
export default Restaurant;