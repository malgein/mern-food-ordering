// *Representa un solo checkbox dentro de la lista de tipos de comida. Ofrece una forma sencilla y reactiva de seleccionar múltiples categorías de comida para el restaurante.
// componente de Checkbox personalizado.
import { Checkbox } from "@/components/ui/checkbox";
// componentes de UI para formularios
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
// de react-hook-form permiten tipar correctamente el field que recibimos en las props.
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
	// cuisine: el nombre de la cocina (por ejemplo, "Italian", "Mexican", "Japanese", etc.).
  cuisine: string;
	// un objeto que representa el estado y funciones del campo "cuisines" en el formulario (provisto por react-hook-form)
  field: ControllerRenderProps<FieldValues, "cuisines">;
};

// props destructuradas
const CuisineCheckbox = ({ cuisine, field }: Props) => {
  return (
		// para alinear horizontalmente el checkbox y el texto y añade espacio horizontal entre ellos.
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
					// etermina si esta cocina (cuisine) está seleccionada, verificando si field.value (un array de cocinas seleccionadas) contiene el valor.
          checked={field.value.includes(cuisine)}
          onCheckedChange={(checked) => {
						// Si el checkbox se marca (checked = true), agrega cuisine al array field.value.
            if (checked) {
              field.onChange([...field.value, cuisine]);
            } else {
							// Si el checkbox se desmarca (checked = false), elimina cuisine del array.
              field.onChange(
                field.value.filter((value: string) => value !== cuisine)
								// Esto mantiene sincronizado el estado de selección de cocinas en el formulario principal
              );
            }
          }}
        />
      </FormControl>
			{/* La etiqueta muestra el nombre de la cocina junto al checkbox. */}
			{/* estilo de texto pequeño  y normal */}
      <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
    </FormItem>
  );
};

export default CuisineCheckbox;