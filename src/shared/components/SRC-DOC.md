SCREAMING ARCHITECTURE

src/app: SOLO enrutado. dentro de cada ruta va un archivo page.ts y que dentro contiene:

        export { default } from "@/modules/catalog/pages/home/Home"

        Esto debe llevar a la carpeta page donde se renderiza el componente correspondiente dentro de modules

*********************

src/modules: Carpeta que agrupa archivos por FUNCIONALIDAD  
    /auth: autenticacion, login y signup
    /cart: carrito, pagos y ordenes quizá
    /catalog: todo pagina que muestre productos, home, sales, categories
    /community: magazine principalmente
    /user: cuenta, perfil, manager. Todo lo que va con usuario y administrador

    Cada carpeta dentro tendra todo lo que se necesita para trabajar en esa funcionalidad.
    De forma que si estamos en catalog, encontremos todos los tipos de tarjeta de productos por ejemplo.
    Tambien está la carpeta pages donde si se renderizan los componentes que se exportan las rutas.

src/shared: Todo lo que no sea agrupable en modules, o sea de un scope global del proyecto
    Ejemplo la navBar, configuracion de variables de entorno, utils o helpers globales


        |||||||||||||||||||||||||||||
        Agregué la carpeta services donde se deberían hacer los llamados a la api     
        || Diganme si estan de acuerdo aca, lo podriamos cambiar 
        || para que esta carpeta esté en cada module si les parece mejor