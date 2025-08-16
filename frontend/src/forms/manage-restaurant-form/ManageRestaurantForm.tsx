//* Componente que consiste en un formulario para ingresar datos del restaurante mediante el usuario autenticado

// para hacer validaciones
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Restaurant } from "@/types";
// seccion del formulario
import DetailsSection from "./DetailsSection";
import { Form } from "@/components/ui/form";
import LoadingButton from "@/components/LoadingButton";
import { Separator } from "@radix-ui/react-separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";

import ImageSection from "./ImageSection";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

// Este esquema asegura que:Algunos campos (nombre del restaurante, ciudad, país, etc.) sean requeridos.
const formSchema = z
  .object({
    restaurantName: z.string({
      required_error: "restaurant name is required",
    }),
    city: z.string({
      required_error: "city is required",
    }),
    country: z.string({
      required_error: "country is required",
    }),
    deliveryPrice: z.coerce.number({
      required_error: "delivery price is required",
      invalid_type_error: "must be a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "estimated delivery time is required",
      invalid_type_error: "must be a valid number",
    }),
    cuisines: z.array(z.string()).nonempty({
      message: "please select at least one item",
    }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce.number().min(1, "price is required"),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),
  })
  // .refine para forzar que al menos una forma de imagen sea provista.
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

  // Se infiere automáticamente el tipo de los datos del formulario a partir del esquema de validación.
  type RestaurantFormData = z.infer<typeof formSchema>;

  // El componente recibe:
  type Props = {
    // Un restaurante opcional (para editar).
    restaurant?: Restaurant;
    // Una función onSave que se llama al enviar el formulario.
    onSave: (restaurantFormData: FormData) => void;
    // Un booleano isLoading para mostrar un botón de carga.
    isLoading: boolean;
  };
  
  const ManageRestaurantForm = ({ onSave, isLoading, restaurant  } : Props) => {
    // Se inicializa el formulario con react-hook-form
    const form = useForm<RestaurantFormData>({
      // usando zodResolver para validar con el esquema de Zod.
      resolver: zodResolver(formSchema),
      // Se configuran valores por defecto.
      defaultValues: {
        cuisines: [],
        menuItems: [{ name: "", price: 0 }],
      },
    });

    // useEffect para cargar los valores del restaurante en caso de edición
    // se encarga de formatear precios al editar un restaurante existente.
    useEffect(() => {
      if (!restaurant) {
        return;
      }
  
      // price lowest domination of 100 = 100pence == 1GBP
      // Convierte deliveryPrice de peniques a libras (100 peniques = £1)
      const deliveryPriceFormatted = parseInt(
        (restaurant.deliveryPrice / 100).toFixed(2)
      );
  
          // Convierte cada precio de los items del menú a libras
      const menuItemsFormatted = restaurant.menuItems.map((item) => ({
        ...item,
        price: parseInt((item.price / 100).toFixed(2)),
      }));
  

    // Construye un objeto actualizado con los valores formateados
      const updatedRestaurant = {
        ...restaurant,
        deliveryPrice: deliveryPriceFormatted,
        menuItems: menuItemsFormatted,
      };
  
      // Reset del formulario con los valores formateados
      form.reset(updatedRestaurant);
    }, [form, restaurant]);

    // funcion que envia la informacion registrada en el formulario
    const onSubmit = (formDataJson: RestaurantFormData) => {
      // Se crea un objeto FormData, útil para enviar datos con archivos.
      const formData = new FormData();
  
          // Se agregan todos los campos al objeto FormData (para envío multipart)
      formData.append("restaurantName", formDataJson.restaurantName);
      formData.append("city", formDataJson.city);
      formData.append("country", formDataJson.country);
  
      // Se transforman valores numéricos a centavos (multiplicando por 100).
      formData.append(
        "deliveryPrice",
        (formDataJson.deliveryPrice * 100).toString()
      );
      formData.append(
        "estimatedDeliveryTime",
        formDataJson.estimatedDeliveryTime.toString()
      );
      // Se añaden los elementos del menú y las cocinas.
      formDataJson.cuisines.forEach((cuisine, index) => {
        formData.append(`cuisines[${index}]`, cuisine);
      });
       // Agregar los ítems del menú con nombre y precio convertido
      formDataJson.menuItems.forEach((menuItem, index) => {
        formData.append(`menuItems[${index}][name]`, menuItem.name);
        formData.append(
          `menuItems[${index}][price]`,
          (menuItem.price * 100).toString()
        );
      });
  
      // Si se subió una imagen como archivo, se incluye.
      if (formDataJson.imageFile) {
        formData.append(`imageFile`, formDataJson.imageFile);
      }
      // Finalmente se llama a onSave() pasando formData.
      onSave(formData);
    };

    return (
      <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>

    )
  }
  
  export default ManageRestaurantForm