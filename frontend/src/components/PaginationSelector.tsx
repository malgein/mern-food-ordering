// *Este componente PaginationSelector genera los controles de paginación en la búsqueda de restaurantes:
// Se importan varios componentes de UI relacionados con la paginación: contenedor principal (Pagination), el contenido (PaginationContent), cada ítem (PaginationItem), los links numéricos (PaginationLink), y los botones de navegación (PaginationPrevious, PaginationNext).
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

// Se define el tipo de las props:
type Props = {
  page: number; //el número de página actual.
  pages: number; //total de páginas disponibles.
  onPageChange: (page: number) => void; //función que se ejecuta cuando el usuario selecciona otra página (recibe el nuevo número).
};

const PaginationSelector = ({ page, pages, onPageChange }: Props) => {
	// Se crea un array pageNumbers con todos los números de página desde 1 hasta pages.
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
		// Ejemplo: si pages = 5, entonces pageNumbers = [1,2,3,4,5].
  }

  return (
    <Pagination>
			{/* Dentro de PaginationContent se colocan los elementos de navegación (previo, números, siguiente). */}
      <PaginationContent>
				{/* Si no estás en la primera página, muestra un botón “Anterior”. */}
        {page !== 1 && (
          <PaginationItem>
						{/* Al hacer clic, ejecuta onPageChange(page - 1), moviéndote una página hacia atrás. */}
            <PaginationPrevious
              href="#"
              onClick={() => onPageChange(page - 1)}
            />
          </PaginationItem>
        )}
{/* Se itera sobre todos los números de página y se crea un PaginationItem con su PaginationLink. */}
        {pageNumbers.map((number) => (
          <PaginationItem>
            <PaginationLink
						// Al hacer clic en un número, se llama a onPageChange(number) para cambiar de página.
              href="#"
              onClick={() => onPageChange(number)}
							// isActive={page === number} resalta la página actual.
              isActive={page === number}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
{/* Si no estás en la última página, muestra un botón “Siguiente”. */}
        {page !== pageNumbers.length && (
          <PaginationItem>
						{/* Al hacer clic, ejecuta onPageChange(page + 1) para avanzar una página. */}
            <PaginationNext href="#" onClick={() => onPageChange(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationSelector;