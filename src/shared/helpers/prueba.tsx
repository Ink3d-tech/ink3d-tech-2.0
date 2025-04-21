// /* <header>
//     <div class="header-container">
//         <div class="header-logo">
//             <img src="hulk.png" alt="">
//         </div>
//     <nav class="header-nav">
//         <ul>
//             <li><a class="header-menu" href="#">Tu Espacio</a></li>
//             <li><a class="header-menu" href="#">Calendario</a></li>
//             <li><a class="header-menu" href="#">Modalidades</a></li>
//             <li><a class="header-menu" href="#">Merchandising</a></li>
//             <li><a class="header-menu active" href="#">Contáctanos</a></li>
//         </ul>
//     </nav>
// </header> */



interface PropsIndice {
    extraStyles?: string
    name: string
    href: string
}

const dataIndice = [
    {
        extraStyles: "active",
        href: "/menu",
        name: "Inicio"
    },
    {
        extraStyles: "active",
        href: "/menu",
        name: "Inicio"
    },
    {
        extraStyles: "active",
        href: "/menu",
        name: "Inicio"
    },
    {
        extraStyles: "active",
        href: "/menu",
        name: "Inicio"
    }
]

export const Indice = ({indice} : {indice: PropsIndice}) => {
    const { extraStyles, name, href } = indice
    return <li><a className={`header-menu ${extraStyles ?? ""}`} href={href}>{name}</a></li>
}

export const ListaIndices = () => {
    return <ul>{dataIndice.map((i, index) => <Indice indice={i} key={index}/>)}</ul>
}


export const NavBar = () => {
    return (
        /* <header>
    <div class="header-container">
        <div class="header-logo">
            <img src="hulk.png" alt="">
        </div>
    <nav class="header-nav">
        <ul>
            <li><a class="header-menu" href="#">Tu Espacio</a></li>
            <li><a class="header-menu" href="#">Calendario</a></li>
            <li><a class="header-menu" href="#">Modalidades</a></li>
            <li><a class="header-menu" href="#">Merchandising</a></li>
            <li><a class="header-menu active" href="#">Contáctanos</a></li>
        </ul>
    </nav>
</header> */
    )
}


