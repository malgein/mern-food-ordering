// * Componente que muestra cada restaurante en forma de tarjeta clickeable que lleva a la página de detalle.
import { Restaurant } from "@/types";              // Tipo definido para representar la estructura de un restaurante
import { Link } from "react-router-dom";          // Link de react-router-dom para navegación entre páginas
import { AspectRatio } from "./ui/aspect-ratio";  // Componente que mantiene proporción de imágenes
import { Banknote, Clock, Dot } from "lucide-react"; // Iconos para mejorar la visualización

// Props que recibe este componente: un restaurante
type Props = {
  restaurant: Restaurant;
};

const SearchResultCard = ({ restaurant }: Props) => {
  return (
    // Cada tarjeta es un Link que redirige al detalle del restaurante
    <Link
      to={`/detail/${restaurant._id}`}                     // Navega a la página de detalles del restaurante
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group"  // Diseño en dos columnas (imagen y texto) en pantallas grandes
    >
      {/* Sección de la imagen con proporción controlada */}
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}                        // Imagen del restaurante
          className="rounded-md w-full h-full object-cover" // Estilos: bordes redondeados y ocupa todo el espacio
        />
      </AspectRatio>

      {/* Sección del contenido textual */}
      <div>
        {/* Nombre del restaurante con estilo llamativo y subrayado al pasar el mouse */}
        <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
          {restaurant.restaurantName}
        </h3>

        {/* Contenedor principal del contenido debajo del título */}
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
          {/* Lista de cocinas del restaurante */}
          <div className="flex flex-row flex-wrap">
            {restaurant.cuisines.map((item, index) => (
              <span className="flex" key={index}>
                <span>{item}</span>
                {/* Se añade un separador (·) entre los elementos menos en el último */}
                {index < restaurant.cuisines.length - 1 && <Dot />}
              </span>
            ))}
          </div>

          {/* Información adicional: tiempo de entrega y precio */}
          <div className="flex gap-2 flex-col">
            {/* Tiempo estimado de entrega con ícono de reloj */}
            <div className="flex items-center gap-1 text-green-600">
              <Clock className="text-green-600" />
              {restaurant.estimatedDeliveryTime} mins
            </div>

            {/* Precio de delivery con ícono de billete */}
            <div className="flex items-center gap-1">
              <Banknote />
              Delivery from £{(restaurant.deliveryPrice / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
