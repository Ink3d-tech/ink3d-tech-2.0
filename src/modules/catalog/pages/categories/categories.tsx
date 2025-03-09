// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import BackButton from "@/shared/components/buttons/BackButton.component";

// const categoriesData = [
//   { name: "MOTOSPORTS", image: "/images/LogoMotorsport.png", link: "/comingsoon" },
//   { name: "ASIAN", image: "/images/LogoAsian.png", link: "/products" },
//   { name: "STREETWEAR", image: "/images/LogoMotorsport.png", link: "/comingsoon" },
// ];
// const Categories = () => {
//   return (
//     <div>
//       <BackButton tab="Categorias"/>
//       <div className="flex justify-center items-start min-h-screen py-12">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl px-6">
//           {categoriesData.map((category, index) => (
//             <Link key={index} href={category.link} passHref>
//               <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer">
//                 <div className="relative w-full h-48">
//                   <Image
//                     src={category.image}
//                     alt={category.name}
//                     layout="fill"
//                     objectFit="cover"
//                   />
//                 </div>
//                 <div className="p-4 text-center shadow-md">
//                   <p className="font-bold text-lg">{category.name}</p>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Categories;








// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import BackButton from "@/shared/components/buttons/BackButton.component";

// const categoriesData = [
//   { name: "Motorsport", image: "/images/LogoMotorsport.png", link: "/products/style/Motorsport" },
//   { name: "Asian", image: "/images/LogoAsian.png", link: "/products/style/Asian" },
//   { name: "Streetwear", image: "/images/LogoStreetwear.png", link: "/products/style/Streetwear" },
// ];

// const Categories = () => {
//   return (
//     <div>
//       <BackButton tab="Categorías" />
//       <div className="flex justify-center items-start min-h-screen py-12">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl px-6">
//           {categoriesData.map((category, index) => (
//             <Link key={index} href={category.link} passHref>
//               <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer">
//                 <div className="relative w-full h-48">
//                   <Image
//                     src={category.image}
//                     alt={category.name}
//                     layout="fill"
//                     objectFit="cover"
//                   />
//                 </div>
//                 <div className="p-4 text-center shadow-md">
//                   <p className="font-bold text-lg uppercase">{category.name}</p>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Categories;




import React from "react";
import Link from "next/link";
import Image from "next/image";
import BackButton from "@/shared/components/buttons/BackButton.component";

const categoriesData = [
  { name: "Motorsport", image: "/images/LogoMotorsport.png", link: "/products?style=Motorsport" },
  { name: "Asian", image: "/images/LogoAsian.png", link: "/products?style=Asian" },
  { name: "Streetwear", image: "/images/LogoStreetwear.png", link: "/products?style=Streetwear" },
];

const Categories = () => {
  return (
    <div>
      <BackButton tab="Categorías" />
      <div className="flex justify-center items-start min-h-screen py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl px-6">
          {categoriesData.map((category, index) => (
            <Link key={index} href={category.link} passHref>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer">
                <div className="relative w-full h-48">
                  <Image
                    src={category.image}
                    alt={category.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4 text-center shadow-md">
                  <p className="font-bold text-lg uppercase">{category.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
