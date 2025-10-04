import { Link } from "react-router-dom";

// Definición de las props que recibe el componente
type Props = {
  total: number; // número total de restaurantes encontrados
  city: string;  // ciudad donde se realizó la búsqueda
};

// Componente funcional que muestra la información de resultados de búsqueda
const SearchResultInfo = ({ total, city }: Props) => {
  return (
		// en el main div para pantallas grandes  los elementos se ubicaran en el centro y los elementos se ubicaran en filas mientras que normalmente se ubicarian en columnas siendo asi para pantallas mas pequenas
    <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
      {/* Texto que indica cuántos restaurantes se encontraron en la ciudad */}
      <span>
        {total} Restaurants found in {city}
        {/* Link para que el usuario cambie la ubicación (lo redirige al inicio) */}
        <Link
          to="/"
          className="ml-1 text-sm font-semibold underline cursor-pointer text-blue-500"
        >
          Change Location
        </Link>
      </span>
    </div>
  );
};

export default SearchResultInfo;
