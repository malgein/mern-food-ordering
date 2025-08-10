// * MenuItemInput es un componente reutilizable que permite, editar un ítem del menú, con nombre y precio, eliminar el ítem con un botón, está completamente integrado con react-hook-form gracias a FormField y useFormContext, usa el índice del array para identificar su campo específico dentro del estado del formulario.

// Componentes de UI reutilizables estilizados
import { Button } from "@/components/ui/button";
//  Elementos auxiliares que facilitan la integración con react-hook-form.
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// Componentes de UI reutilizables estilizados
import { Input } from "@/components/ui/input";
//  Hook que da acceso al control del formulario sin necesidad de pasar props manualmente.
import { useFormContext } from "react-hook-form";

type Props = {
  //  posición del platillo actual dentro del array menuItems
  index: number;
  // Función para eliminar este ítem del array (la provee useFieldArray desde el componente padre MenuSection).
  removeMenuItem: () => void;
};

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
  // Extrae control desde el contexto global del formulario para conectar los inputs a la lógica de react-hook-form.
  const { control } = useFormContext();

  return (
    // Estructura en fila horizontal.
    // Alinea todos los elementos con items-end.
    // gap-2 da espacio horizontal entre elementos.
    <div className="flex flex-row items-end gap-2">
      {/* Campo para introducir el nombre del  platillo */}
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              {/* FormMessge: Mensaje de error en caso de validación fallida (integrado junto a la etiqueta). */}
              Name <FormMessage />
            </FormLabel>
            <FormControl>
              {/* Campo de texto donde se escribe el nombre del platillo. */}
              <Input
                {...field}
                placeholder="Cheese Pizza"
                className="bg-white"
              />
            </FormControl>
          </FormItem>
        )}
      />
      {/* Campo para introducir el precio del platillo */}
      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Price (£) <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="8.00" className="bg-white" />
            </FormControl>
          </FormItem>
        )}
      />
      {/* Boton para eliminar el platillo */}
      <Button
        type="button"
        onClick={removeMenuItem}
        className="bg-red-500 max-h-fit"
      >
        Remove
      </Button>
    </div>
  );
};

export default MenuItemInput;