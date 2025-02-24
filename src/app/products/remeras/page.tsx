import BackButton from "@/shared/components/BackButton.component";
import ProductTshirt from "./ProductTshirt.component";

export default function Home() {
  return (
    <div className="flex flex-col bg-gray-300">
    <div className="mb-6">
        <BackButton tab="Remeras"/>
    </div>
        <ProductTshirt category="remeras"/>
    </div>
  );
}
