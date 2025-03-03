// import { Mixin } from "@/modules/auth/shared/components/MixinAlert";


// export const handlerSubmit = async <T extends Record<string, any>>(
//     event: React.FormEvent<HTMLFormElement>,
//     state: T[],
//     itemLabel: string,
//     form: T,
//     action: (form: T) => Promise<void>,
//     successMessage: string,
//     setForm: React.Dispatch<React.SetStateAction<T>>
//   ) => {
//     event.preventDefault();

//     if (Object.values(form).some(value => value === "" || value === undefined || value === null)) {
//       Mixin.fire("Error", "Por favor, completa todos los campos correctamente.", "error");
//       return;
//     }

//     // const existingItem = state.some(cat => cat.name?.toLowerCase() === form.name?.toLowerCase())
    
//     // if (existingItem) {
//     //   const message = `${itemLabel}: "${form.name}"`
//     //   Mixin.fire(`${message} ya está registrado`, "", "warning");
//     //   return
//     // }
   
  
//     await action(form); 
  
//     setForm(Object.fromEntries(Object.keys(form).map(key => [key, ""])) as T); 
  
//     Mixin.fire(successMessage, "", "success"); 
// };

// export const handlerChange = async <T extends Record<string, any>>(
//   event: React.ChangeEvent<HTMLInputElement  | HTMLSelectElement | HTMLTextAreaElement>,
//   form: T,
//   setForm: React.Dispatch<React.SetStateAction<T>>
// ) => {
//   const { name, value } = event.target;
//     setForm({
//       ...form,
//       [name]: value
//     });
// }