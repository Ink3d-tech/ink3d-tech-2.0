import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface VerMasProps {
  href: string;
}

const VerMas = ({ href }: VerMasProps) => {
  return (
    <div>
      <div className="w-full h-px bg-gray-300 my-2"></div>
      <div className="flex justify-between items-center m-4 -my-1 mb-2">
        <Link href={href} className="text-blue-600 font-semibold hover:underline">
          Ver más
        </Link>
        <Link href={href} className="text-blue-600">
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
};

export default VerMas;