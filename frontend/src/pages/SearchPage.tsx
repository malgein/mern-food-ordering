import { useSearchRestaurants } from "@/api/RestaurantApi"; // Hook para comunicarse con la API y obtener resultados de búsqueda
// import CuisineFilter from "@/components/CuisineFilter"; // Componente para filtrar por tipo de cocina
// import PaginationSelector from "@/components/PaginationSelector"; // Componente para paginación
import SearchBar, { SearchForm } from "@/components/SearchBar"; // Barra de búsqueda
import SearchResultCard from "@/components/SearchResultCard"; // Tarjeta que muestra cada restaurante
import SearchResultInfo from "@/components/SearchResultInfo"; // Muestra info general de los resultados (ej: "200 resultados en Miami")
// import SortOptionDropdown from "@/components/SortOptionDropdown"; // Selector para cambiar criterio de ordenamiento
import { useState } from "react";
import { useParams } from "react-router-dom"; // Para obtener la ciudad de la URL

// Estado que define la búsqueda (texto, página, cocinas seleccionadas y criterio de orden)
export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  // Obtenemos el parámetro de ciudad desde la URL (/search/:city)
  const { city } = useParams();

  // Estado inicial de la búsqueda
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",       // texto de búsqueda
    page: 1,               // página actual
    selectedCuisines: [],  // cocinas seleccionadas como filtros
    sortOption: "bestMatch", // criterio de ordenamiento
  });

  // Estado para expandir o colapsar el filtro de cocinas
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Hook que obtiene los resultados desde la API
  // extraemos results e isLoading de la api mientras le pasamos nuestro state y el city que se obtiene de params
  const { results, isLoading } = useSearchRestaurants(searchState, city);

  // Actualiza el criterio de ordenamiento y resetea la paginación
  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  // Actualiza las cocinas seleccionadas y resetea la paginación
  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  // Cambia la página actual
  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  // Actualiza el texto de búsqueda desde el formulario y resetea la página
  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  // Resetea el campo de búsqueda (texto vacío, página 1)
  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  // Mientras los datos cargan
  if (isLoading) {
    <span>Loading ...</span>;
  }

  // Si no hay resultados o no hay ciudad
  if (!results?.data || !city) {
    return <span>No results found</span>;
  }

  // ? Los id estan con propositos de orientacion nada mas no con otros propositos como el de css
  return (
    // Para pantallas mas pequenas se mostraran 2 columnas  la primera medira 250px de largo y la otra el resto
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      {/* Sidebar con lista de filtros por cocina */}
      <div id="cuisines-list">
        {/* <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        /> */}
      </div>

      {/* Contenido principal */}
      <div id="main-content" className="flex flex-col gap-5">
        {/* Barra de búsqueda */}
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by Cuisine or Restaurant Name"
          onReset={resetSearch}
        />

        {/* Info de resultados + selector de orden */}
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo total={results.pagination.total} city={city} />
          {/* <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          /> */}
        </div>

        {/* Tarjetas con los restaurantes */}
        {results.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
        {/* Paginación */}
        {/* <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        /> */}
      </div>
    </div>
  );
};

export default SearchPage;
