import BackButton from "@/shared/components/BackButton.component";
import ProductTshirt from "./ProductSweatshirt.component";

export default function Home() {
  return (
    <div className="flex flex-col bg-gray-300">
    <div className="mb-6">
        <BackButton tab="Buzos"/>
    </div>
        <ProductTshirt category="buzos"/>
    </div>
  );
}
