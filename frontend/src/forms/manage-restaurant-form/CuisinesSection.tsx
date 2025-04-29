//* Componente Muestra una lista de tipos de cocina como checkboxes, Permite seleccionar uno o varios tipos Se conecta de manera controlada al formulario principal.

// Componentes de formulario (FormField, FormItem, FormMessage, etc.) que ayudan a construir un formulario reactivo y estilizado.
import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
//  para acceder al contexto global del formulario sin necesidad de props.
import { useFormContext } from "react-hook-form";
// cuisineList, una lista de opciones de cocinas (por ejemplo, Italiana, Mexicana, China...) desde una configuración externa.
import { cuisineList } from "@/config/restaurant-options-config";
import CuisineCheckbox from "./CuisineCheckbox";


// para obtener el control, que permitirá conectar esta sección al estado del formulario de react-hook-form.
const CuisinesSection = () => {
  const { control } = useFormContext();

  return (
		// el contenido se organiza verticalmente (space-y-2 agrega espacio entre los elementos
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Cuisines</h2>
        <FormDescription>
          Select the cuisines that your restaurant serves
        </FormDescription>
      </div>
			{/* Se crea un campo de formulario vinculado al nombre cuisines (un array de strings). */}
      <FormField
        control={control}
        name="cuisines"
				// render recibe field, que contiene las funciones y valores necesarios para manejar el estado de este campo.
        render={({ field }) => (
          <FormItem>
						{/* Se crea una grilla (grid) que:  En pantallas medianas (md) muestra 5 columnas.Agrega un pequeño espacio (gap-1) entre los elementos.*/}
            <div className="grid md:grid-cols-5 gap-1">
							{/* Se itera sobre cuisineList para crear un CuisineCheckbox por cada tipo de cocina. */}
              {cuisineList.map((cuisineItem) => (
                <CuisineCheckbox cuisine={cuisineItem} field={field} />
              ))}
            </div>
						{/* FormMessage muestra mensajes de error si la validación falla (por ejemplo, si no selecciona ninguna cocina). */}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CuisinesSection;