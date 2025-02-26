import React from "react";
import Image from "next/image";
import BackButton from "@/shared/components/buttons/BackButton.component";

const ComingSoon = () => {
  return (
    <div>
        <BackButton tab="Proximamente"/>
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
