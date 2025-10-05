// *Componente que brinda la funcionalidad de ordenar los restaurantes por diversosn criterios en los resultados de busqueda
// botón estilizado.
import { Button } from "./ui/button";
// contenedor principal del menú.
import {
  DropdownMenu,
	// contenedor de las opciones desplegadas.
  DropdownMenuContent,
	// cada una de las opciones del menú.
  DropdownMenuItem,
	// elemento que dispara la apertura del menú (en este caso, el botón).
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Props = {
	// función que se ejecutará cuando el usuario seleccione una nueva opción de ordenamiento (se envía el valor asociado a esa opción
  onChange: (value: string) => void;
	// el valor actual de la opción seleccionada (controlado externamente, por el componente padre
  sortOption: string;
};
// opciones disponibles para ordenar:
const SORT_OPTIONS = [
	// Cada objeto tiene un label (texto mostrado al usuario) y un value (valor lógico usado por la app para filtrar/ordenar los resultados).
  {
    label: "Best match",
    value: "bestMatch",
  },
  {
    label: "Delivery price",
    value: "deliveryPrice",
  },
  {
    label: "Estimated delivery time",
    value: "estimatedDeliveryTime",
  },
];

const SortOptionDropdown = ({ onChange, sortOption }: Props) => {
	// Se busca el label correspondiente a la opción actualmente seleccionada
  const selectedSortLabel =
    SORT_OPTIONS.find((option) => option.value === sortOption)?.label ||
    SORT_OPTIONS[0].label;
// Si no se encuentra ninguna coincidencia (por ejemplo, si sortOption está vacío o no definido), se usa el primer elemento del arreglo ("Best match") como valor por defecto.
  return (
    <DropdownMenu>
			{/* El DropdownMenuTrigger define el elemento clickeable que abre el menú.
Dentro se coloca un botón (Button) con estilo outline (bordeado, sin fondo sólido). */}
      <DropdownMenuTrigger className="cursor-pointer">
				{/* La clase w-full asegura que el botón ocupe el ancho completo del contenedor. */}
        <Button variant="outline" className="w-full">
          Sort by: {selectedSortLabel}
        </Button>
      </DropdownMenuTrigger>
			{/* DropdownMenuContent contiene los elementos que aparecen cuando se despliega el menú. */}
      <DropdownMenuContent>
				{/* Se recorren todas las opciones de SORT_OPTIONS usando .map() y se crea un DropdownMenuItem por cada una. */}
        {SORT_OPTIONS.map((option) => (
					// Al hacer clic en una opción, se llama a onChange(option.value) — esto notifica al componente padre para que actualice el ordenamiento de los platos o restaurantes según el criterio elegido.
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortOptionDropdown;