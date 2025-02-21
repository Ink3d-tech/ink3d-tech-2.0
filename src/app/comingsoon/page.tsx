import React from "react";
import Image from "next/image";
import BackButton from "@/shared/components/BackButton.component";

const ComingSoon = () => {
  return (
    <div>
      <div className='bg-black h-12 flex items-center px-3'>
        <BackButton />
        <h1 className='text-some-gray ml-2 text-base'>Coming Soon</h1>
      </div>
      <div className="flex justify-center items-center min-h-screen bg-black">
        {/* Imagen centrada con tamaño ajustado */}
        <div className="relative w-full max-w-xl h-auto" style={{ maxHeight: "70vh" }}>
          <Image
            src="/images/ComingSoon.jpg"
            alt="Coming Soon"
            layout="responsive"
            width={700}
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
