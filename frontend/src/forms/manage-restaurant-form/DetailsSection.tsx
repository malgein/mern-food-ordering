//*Este componente forma parte del formulario principal y se encarga de mostrar los campos relacionados con los detalles básicos del restaurante.

// Importa componentes personalizados para construir formularios (FormControl, FormField, etc.).
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
	// Input es un campo de entrada reutilizable de UI.
  import { Input } from "@/components/ui/input";
	// hook de react-hook-form que permite acceder al estado del formulario desde un componente hijo, sin necesidad de pasar props.
  import { useFormContext } from "react-hook-form";
  
  const DetailsSection = () => {

		// Esto obtiene el control de react-hook-form para conectar los campos del formulario al sistema de validación y control de estado.
    const { control } = useFormContext();
    return (
      <div className="space-y-2">
        <div>
          <h2 className="text-2xl font-bold">Details</h2>
          <FormDescription>
            Enter the details about your restaurant
						{/* texto descriptivo que da contexto al usuario. */}
          </FormDescription>
        </div>
        <FormField
          control={control}
          name="restaurantName"
					// contiene las props necesarias para vincular el input al formulario.
          render={({ field }) => (
            <FormItem>
							{/* etiqueta visible. */}
              <FormLabel>Name</FormLabel>
              <FormControl>
								{/* Campo para ingresar el nombre del restaurante. */}
                <Input {...field} className="bg-white" />
								{/*  envuelve el input para aplicar estilos y lógica. */}
              </FormControl>
							{/* espacio para mostrar errores */}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Ciudad */}
        {/* Agrupa dos campos (city y country) en una misma fila usando flex */}
        <div className="flex gap-4">
          <FormField
            control={control}
            name="city"
            render={({ field }) => (
                  // Hace que la seccion de ciudad ocupe todo el ancho de la pantalla
              <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* pais */}
          {/* Ambos campos city y country están distribuidos uniformemente (flex-1) */}
          <FormField
            control={control}
            name="country"
            render={({ field }) => (
              // Hace que la seccion de pais ocupe todo el ancho de la pantalla
              <FormItem className="flex-1">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Precio de entrega */}
        <FormField
          control={control}
          name="deliveryPrice"
          render={({ field }) => (
            // Limita el ancho a un 25% del contenedor.
            <FormItem className="max-w-[25%]">
              <FormLabel>Delivery price (£)</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" placeholder="1.50" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* tiempo estimado de entrega */}
        <FormField
          control={control}
          name="estimatedDeliveryTime"
          render={({ field }) => (
            <FormItem className="max-w-[25%]">
              <FormLabel>Estimated Delivery Time (minutes)</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" placeholder="30" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  };
  
  export default DetailsSection;
  