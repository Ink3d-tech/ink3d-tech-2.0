import BackButton from "@/shared/components/BackButton.component";
import ProductPants from "./ProductPants.component";

export default function Home() {
  return (
    <div className="flex flex-col bg-gray-300">
    <div className="mb-6">
        <BackButton tab="Pantalones"/>
    </div>
        <ProductPants category="pantalones"/>
    </div>
  );
}
