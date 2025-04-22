// Archivo que consiste en la seccion  de modificacion del usuario perse   
// Archivo de validaciones para nuestro formulario en el frontend de usuarios

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// Los componentes de shadcn que haran practicamente todo el trabajo en cuanto frontend se refiere
import { Form, FormItem, FormDescription, FormField, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
// Componente Input de shadcn recordemos que se guardan en una carpeta llamada ui en  src/components
import { Input } from "@/components/ui/input";
// Componente Button de shadcn en forma de spiner para el boton de submit
import LoadingButton from "@/components/LoadingButton";
// Componente button de shadcn de boton
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { useEffect } from "react";

// atributo typescript que usamos para nombrar cada casilla de input para modificar atributos del usuario ej name, citiy, addres , etc, permite recordarnos el nombre de cada formField (input de nuestra seccion de modificacion de datos del usuario)
const formSchema = z.object({
    email: z.string().optional(),
    // Al aplicar el atributo min nos aseguramos de que dicha propiedad sea requerida para el input correspondiente
    name: z.string().min(1, "name is required"),
    addressLine1: z.string().min(1, "Address Line 1 is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
  });
  
  export type UserFormData = z.infer<typeof formSchema>;
  
  type Props = {
    currentUser: User;
    onSave: (userProfileData: UserFormData) => void;
    isLoading: boolean;
    // title?: string;
    // buttonText?: string;
  };

  // Componente padre como tal que encierra toda la seccion de form
  const UserProfileForm = ({
    onSave, isLoading, currentUser }: Props) => {
      const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        // propiedad de valores por defecto se le pasa la informacion del usuario actual por defecto
        defaultValues: currentUser,
      });

      // Hace que apenas se inicie el formulario en dichos campos de input se agrege la informacion del usuario actual
      useEffect(() => {
        form.reset(currentUser);
      }, [currentUser, form]);    

    return (
      // COmponente Form traido de shadcn
      <Form {...form}>
        <form
           onSubmit={form.handleSubmit(onSave)}
           className="space-y-4 bg-gray-50 rounded-lg md:p-10"
        >
            <div>
            <h2 className="text-2xl font-bold">User Profile Form</h2>
            <FormDescription>
              View and change your profile information here
            </FormDescription>
          </div>
          {/* FormFIeld es muy importante se trata de un elemento de la libreria shadcn haciendo uso de uan propiedad render retorna tipo funcion otros elementos  con un item y label para casillas donde colocar la informacion del usuario */}
          <FormField control={form.control} name={"email"} render={({ field }) => (
            <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              {/* La propiedad disabled significa que no podremos escribir en el form osea que el email es no editable */}
              <Input {...field} disabled className="bg-white" />
            </FormControl>
          </FormItem>
          )}/>

          <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
{/* div que encierra las propiedades de addres, city */}
<div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Si la aplicacion esta cargando devuelve un spiner si no devuleve el boton de submit  */}
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" className="bg-orange-500">
            Submit
          </Button>
        )}
        </form>
      </Form>
    )
  }

  export default UserProfileForm

  
 
  