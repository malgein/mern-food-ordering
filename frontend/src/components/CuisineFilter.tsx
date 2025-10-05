// *Muestra una lista de tipos de cocina (cuisineList).
// *Permite seleccionar una o varias mediante “checkboxes” estilizados.
// *Emite los cambios al componente padre mediante onChange.
// *Ofrece un botón “Reset Filters” para limpiar las selecciones.
// *Permite mostrar solo una parte de la lista (7) o todas, con un botón “View More / View Less” que controla isExpanded.
// un arreglo con los tipos de cocina disponibles (por ejemplo: Italian, Mexican, Chinese, etc.).
import { cuisineList } from "@/config/restaurant-options-config";
// Componentes de UI personalizados del proyecto.
import { Label } from "./ui/label";
// Iconos de Lucide React para mejorar la interfaz.
import { Check, ChevronDown, ChevronUp } from "lucide-react";
// El tipo ChangeEvent de React, usado en el manejador de eventos del input.
import { ChangeEvent } from "react";
// Componentes de UI personalizados del proyecto.
import { Button } from "./ui/button";

type Props = {
  onChange: (cuisines: string[]) => void; //función que se ejecuta cuando cambian las cocinas seleccionadas (envía el nuevo arreglo).
  selectedCuisines: string[]; //lista actual de cocinas seleccionadas.
  isExpanded: boolean; //booleano que indica si la lista de cocinas está expandida o contraída.
  onExpandedClick: () => void; //función que cambia el estado de expansión (ver más o ver menos).
};

const CuisineFilter = ({
  onChange,
  selectedCuisines,
  isExpanded,
  onExpandedClick,
}: Props) => {
	// Esta función maneja los cambios en los checkboxes (cuando el usuario marca o desmarca una cocina).
  const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
		// clickedCuisine obtiene el valor de la cocina seleccionada,
    const clickedCuisine = event.target.value;
		// isChecked indica si fue marcada o desmarcada.
    const isChecked = event.target.checked;
// Si la cocina fue marcada, se añade al arreglo actual (selectedCuisines).
    const newCuisinesList = isChecked
		// Si fue desmarcada, se elimina del arreglo.
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

			// Finalmente, se llama a onChange con la nueva lista actualizada.
    onChange(newCuisinesList);
		// Así el componente padre puede actualizar el estado global del filtro.
  };
// Esta función resetea el filtro, vaciando todas las cocinas seleccionadas (pasa un arreglo vacío).
  const handleCuisinesReset = () => onChange([]);

  return (
    <>
		{/* Usa flex para alinear ambos elementos en una sola fila. */}
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter By Cuisine</div>
				{/* Resetea los filtros */}
        <div
          onClick={handleCuisinesReset}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
        >
          Reset Filters
        </div>
      </div>
		{/* Se crea una columna (flex flex-col) con espacio vertical (space-y-2). */}
      <div className="space-y-2 flex flex-col">
        {cuisineList
				// Se usa .slice() para mostrar solo las primeras 7 cocinas si no está expandido (isExpanded === false), o todas si está expandido.
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine) => { //Luego se mapean las cocinas para renderizar cada una como un checkbox estilizado.
            const isSelected = selectedCuisines.includes(cuisine);
            return (
              <div className="flex">
                <input
                  id={`cuisine_${cuisine}`}
									// Se crea un input tipo checkbox oculto (className="hidden") — el diseño visual del “checkbox” lo reemplaza el Label siguiente.
                  type="checkbox"
                  className="hidden"
									// El valor (value) es el nombre de la cocina, y el estado checked se controla con isSelected.
                  value={cuisine}
									// Se determina si está seleccionada (isSelected).
                  checked={isSelected}
                  onChange={handleCuisinesChange}
                />
								{/* Cada Label actúa como el botón visible del filtro. */}
                <Label
								// Al hacer clic en él, activa el checkbox correspondiente (por el atributo htmlFor).
                  htmlFor={`cuisine_${cuisine}`}
									// Cambia su estilo según si está seleccionada:
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
										// Seleccionada → borde verde y texto verde, además muestra un ícono de ✔️ (Check).
                      ? "border border-green-600 text-green-600"
                      : "border border-slate-300"
                  }`}
									// No seleccionada → borde gris claro.
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </Label>
              </div>
            );
          })}
{/* Al hacer clic, ejecuta onExpandedClick, que normalmente alterna el estado isExpanded en el componente padre. */}
        <Button
          onClick={onExpandedClick}
          variant="link"
          className="mt-4 flex-1"
        >
					{/* Si isExpanded es true, muestra el texto “View Less” con un ícono hacia arriba; si no, “View More” con un ícono hacia abajo. */}
          {isExpanded ? (
            <span className="flex flex-row items-center">
              View Less <ChevronUp />
            </span>
          ) : (
            <span className="flex flex-row items-center">
              View More <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  );
};

export default CuisineFilter;