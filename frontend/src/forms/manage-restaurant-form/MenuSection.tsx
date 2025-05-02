// * Componente de la seccion de formulario para restaurantes que trabaja con una lista dinámica de campos para agregar diversos platos 
import { Button } from "@/components/ui/button";
// Elementos de construcción del formulario.
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
// Permite acceder al formulario sin pasar props manualmente. useFieldArray: Hook especial de react-hook-form para manejar campos de tipo arreglo dinámico (como una lista de platillos).
import { useFieldArray, useFormContext } from "react-hook-form";
import MenuItemInput from "./MenuItemInput";
// Componente que representa un campo para ingresar los datos de un platillo (nombre y precio).
// import MenuItemInput from "./MenuItemInput";

const MenuSection = () => {
	// useFormContext proporciona acceso al objeto control que necesitamos para integrar useFieldArray.
  const { control } = useFormContext();

	// gestiona el array menuItems, que representa una lista de platillos.
	// fields: arreglo con los datos actuales (usado para renderizar los inputs).
//append: función que agrega un nuevo platillo vacío.
//remove: función que elimina un platillo por índice.

const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
  });

  return (
		// agrega espacio vertical entre elementos.
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Menu</h2>
        <FormDescription>
          Create your menu and give each item a name and a price
        </FormDescription>
      </div>
					{/* FormField se asocia al campo menuItems */}
      <FormField
        control={control}
        name="menuItems"
        render={() => (
          <FormItem className="flex flex-col gap-2">
						{/* Dentro del render, usamos fields.map(...) para iterar sobre cada platillo. */}
            {fields.map((_, index) => (
              <MenuItemInput
                index={index}
                removeMenuItem={() => remove(index)}
              />
            ))}
          </FormItem>
        )}
      />
			{/* Boton para agregar platillos Al hacer clic, se llama a append para agregar un nuevo objeto al array de menuItems. */}
			{/* Se inicia con un name y price vacíos (aunque price será numérico al final, aquí se maneja como texto inicialmente para evitar errores en los inputs). */}
      <Button type="button" onClick={() => append({ name: "", price: "" })}>
        Add Menu Item
      </Button>
    </div>
  );
};

export default MenuSection;