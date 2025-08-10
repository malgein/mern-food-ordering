//* sección de formulario para subir una imagen en la creación de un restaurante. Esta sección maneja tanto la vista previa de una imagen ya existente como la subida de una nueva imagen: 

// Permite mostrar una imagen previa si ya existe.

// Permite subir una nueva imagen con validaciones y control de formulario.

// Está optimizado visualmente (con AspectRatio, object-cover, y estilos de Tailwind).

// Usa react-hook-form para integración con validación y manejo de estado del formulario.


// Importa el componente AspectRatio, que probablemente mantiene una proporción de aspecto (en este caso 16:9) para las imágenes cargadas, asegurando que se vean bien y uniformes.
// import { AspectRatio } from "@/components/ui/aspect-ratio";
// Importa varios componentes relacionados con la estructura y validación del formulario (basado probablemente en React Hook Form), para estilizar e integrar correctamente el input del archivo.
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
// Importa el componente de entrada de datos (input), estilizado, para subir archivos.
import { Input } from "@/components/ui/input";
// Importa el hook que permite acceder al contexto del formulario de React Hook Form. Esto hace posible reutilizar los datos y controladores del formulario padre.
import { useFormContext } from "react-hook-form";

const ImageSection = () => {
  // Obtiene el control (para vincular inputs con React Hook Form) y watch (para observar el valor de un campo en tiempo real).
  const { control, watch } = useFormContext();

  // Observa el campo imageUrl. Si ya hay una imagen cargada previamente (por ejemplo, en modo edición), la variable existingImageUrl la almacenará para mostrarla como vista previa.
  const existingImageUrl = watch("imageUrl");

  return (
    // Contenedor principal del componente con separación vertical entre elementos
    <div className="space-y-2">
      <div>
        {/* Título de la sección y una descripción informativa. Indica que esta imagen aparecerá en la lista de restaurantes y que al cargar una nueva se sobrescribirá la actual. */}
        <h2 className="text-2xl font-bold">Image</h2>
        <FormDescription>
          Add an image that will be displayed on your restaurant listing in the
          search results. Adding a new image will overwrite the existing one.
        </FormDescription>
      </div>
      {/* Título de la sección y una descripción informativa. Indica que esta imagen aparecerá en la lista de restaurantes y que al cargar una nueva se sobrescribirá la actual. */}
      <div className="flex flex-col gap-8 md:w-[50%]">
        {/* Si existingImageUrl tiene un valor (es decir, ya hay una imagen cargada), se muestra dentro de un contenedor con proporción 16:9.
        object-cover: ajusta la imagen para que llene el contenedor recortando lo que sobresalga.rounded-md: esquinas ligeramente redondeadas */}
        {/* {existingImageUrl && (
          <AspectRatio ratio={16 / 9}>
            <img
              src={existingImageUrl}
              className="rounded-md object-cover h-full w-full"
            />
          </AspectRatio>
        )} */}
        {/* Campo del formulario llamado imageFile, vinculado al control de React Hook Form. */}
        <FormField
          control={control}
          name="imageFile"
          // Renderiza un input de tipo file (para seleccionar imagen), limitado a formatos de imagen comunes.
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-white"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  // Cuando se selecciona un archivo, actualiza el campo imageFile con el archivo seleccionado (el primero si hay varios). Si no hay archivo, lo establece como null
                  onChange={(event) =>
                    field.onChange(
                      event.target.files ? event.target.files[0] : null
                    )
                  }
                />
                {/* Muestra el input y el mensaje de error si hay validaciones fallidas (por ejemplo, si el campo es requerido y no se ha cargado una imagen) */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ImageSection;