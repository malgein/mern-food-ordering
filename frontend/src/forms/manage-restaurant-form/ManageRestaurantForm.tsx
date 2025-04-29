//* Componente que consiste en un formulario para ingresar datos del restaurante mediante el usuario autenticado

// para hacer validaciones
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Restaurant } from "@/types";
// seccion del formulario
import DetailsSection from "./DetailsSection";
import { Form } from "@/components/ui/form";
import { Separator } from "@radix-ui/react-separator";

// Este esquema asegura que:Algunos campos (nombre del restaurante, ciudad, país, etc.) sean requeridos.
const formSchema = z
  .object({
    restaurantName: z.string({
      required_error: "restuarant name is required",
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
  
  const ManageRestaurantForm = () => {
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

    return (
      <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        {/* <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection /> */}
        {/* {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>} */}
      </form>
    </Form>

    )
  }
  
  export default ManageRestaurantForm