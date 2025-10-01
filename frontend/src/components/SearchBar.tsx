//*Este componente es un formulario reutilizable de búsqueda con validación usando Zod, controlado por React Hook Form
//Se importan zodResolver para validar con Zod, useForm para manejar formularios con React Hook Form, y z para definir esquemas de validación.
import { zodResolver } from "@hookform/resolvers/zod";
// Se importan componentes de UI personalizados (Form, FormControl, etc.), el ícono Search de lucide-react, y los componentes Input y Button.
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
// También se importa useEffect para manejar efectos secundarios.
import { useEffect } from "react";

// Se define un esquema de validación con Zod: el formulario debe tener un campo searchQuery que es una cadena obligatoria.
const formSchema = z.object({
  searchQuery: z.string({
		// Si está vacío, mostrará el error "Restaurant name is required".
    required_error: "Restaurant name is required",
  }),
});
// Se genera un tipo TypeScript automáticamente a partir del esquema ({ searchQuery: string }).
export type SearchForm = z.infer<typeof formSchema>;


type Props = {
	// función que recibe los datos del formulario.
  onSubmit: (formData: SearchForm) => void;
	// texto del placeholder del input.
  placeHolder: string;
	// función opcional que se llama al resetear.
  onReset?: () => void;
	// valor inicial opcional del campo de búsqueda.
  searchQuery?: string;
};
// Se inicializa el formulario con useForm, usando el zodResolver para validar y estableciendo searchQuery como valor inicial
const SearchBar = ({ onSubmit, onReset, placeHolder, searchQuery }: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
    },
  });

  useEffect(() => {
		// Cada vez que cambie la prop searchQuery, el formulario se resetea con ese valor. Esto mantiene sincronizado el input si el valor viene de fuera (por ejemplo, un estado global).
    form.reset({ searchQuery });
  }, [form, searchQuery]);

	// Función para resetear manualmente el formulario (limpiar el campo). ejecutado por la prop onReset
  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });

    if (onReset) {
      onReset();
    }
  };

  return (
		// Se renderiza el formulario usando el componente Form.
    <Form {...form}>
      <form
			// maneja el submit con form.handleSubmit(onSubmit)
        onSubmit={form.handleSubmit(onSubmit)}
				//  se añade un borde rojo si existe un error en formulario.
        className={`flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3 ${
          form.formState.errors.searchQuery && "border-red-500"
        }`}
      >
				{/* Renderiza el ícono de búsqueda (Search) con grosor, tamaño y color. */}
        <Search
          strokeWidth={2.5}
          size={30}
					// Icono Oculto en pantallas pequeñas (hidden md:block).
          className="ml-1 text-orange-500 hidden md:block"
        />
				{/* Campo del formulario conectado al control de React Hook Form (form.control). */}
        <FormField
          control={form.control}
					// indica que este input está ligado al campo de búsqueda.
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
								{/* Se usa el componente Input con estilos personalizados y el placeholder pasado por props. */}
                <Input
                  {...field}
                  className="border-none shadow-none text-xl focus-visible:ring-0"
                  placeholder={placeHolder}
                />
              </FormControl>
            </FormItem>
          )}
        />
				{/* 
Botón para resetear el formulario  Ejecuta handleReset al hacer clic.*/}
        <Button
          onClick={handleReset}
          type="button"
          variant="outline"
          className="rounded-full"
        >
          Reset
        </Button>
				{/* Botón Submit, que dispara onSubmit al enviar el formulario. */}
				{/* Estilo de fondo naranja y bordes redondeados. */}
        <Button type="submit" className="rounded-full bg-orange-500">
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;