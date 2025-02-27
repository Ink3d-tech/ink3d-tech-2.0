import BackButton from "@/shared/components/buttons/BackButton.component";
import ProductTshirt from "../../components/ProductSweatshirt.component";

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
