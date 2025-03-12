"use client"

import { X, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { ICartProduct } from "../interfaces/cartService.interface";
import { confirmOrderService, paymentCreateService } from "../services/cart.services";
import { useAuth } from "@/modules/auth/shared/context/Auth.context";
import { useCart } from "../context/Cart.context";
import { Mixin } from "@/modules/auth/shared/components/MixinAlert";

const CheckoutModal = ({ setOnClose, validDiscount, discountAmount}: { setOnClose: React.Dispatch<React.SetStateAction<boolean>>, validDiscount: string, discountAmount: number }) => {
    const { emptyCart } = useCart();
    const { getIdUser, token, updateDataUserShipment } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
      phone: '',
      address: '',
      city: '',
      country: ''
    });

    const handleConfirmPurchase = async () => {
      if (!formData.phone || !formData.address || !formData.city || !formData.country) {
        Mixin.fire("Por favor, complete todos los campos antes de continuar.", "", "info");
        return;
      }

      try {
          setLoading(true);
          const userBuyer = getIdUser(localStorage.getItem("token") || "");
          const confirmedCart: ICartProduct[] = JSON.parse(localStorage.getItem(`cart_${userBuyer}`) || "[]");
          const { orderId } = await confirmOrderService(userBuyer, confirmedCart, token, validDiscount);
          const response = await paymentCreateService(orderId, "ARS", confirmedCart, token, discountAmount);
          const link = Object.values(response)[0];
          window.location.href = link;

          emptyCart();
      } catch (error) {
          console.error("Error al confirmar la compra en cart.tsx:", error);
      } finally {
        setLoading(false);
      }
    };
    

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await updateDataUserShipment(formData)
      console.log('Form submitted:', formData);
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    return (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full">
            <div className="border-b border-gray-100 p-4 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-xl font-bold">Completa tu compra</h2>
              <button 
                onClick={() => setOnClose(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Número de teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Ingrese su número de teléfono"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Dirección
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Ingrese su dirección"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      Ciudad
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Ingrese su ciudad"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      País
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Ingrese su país"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div className="pt-6 border-t">
                  <button 
                  onClick={async(e) => {
                      e.preventDefault()
                      await updateDataUserShipment(formData)
                      console.log('Form submitted:', formData);
                      await handleConfirmPurchase()
                  }}
                  type="submit"
                  className={`w-full bg-black text-white py-3 rounded-xl font-semibold 
                  hover:bg-gray-800 transform hover:scale-[1.02] transition-all duration-200
                  flex items-center justify-center gap-2 ${loading || !formData.phone || !formData.address || !formData.city || !formData.country ? "opacity-50 cursor-not-allowed" : ""}`}
                      disabled={loading || !formData.phone || !formData.address || !formData.city || !formData.country}
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Completar compra"}
                    {!loading && <ArrowRight className="w-5 h-5" />}
                  </button>
              </div>
            </form>
          </div>
        </div>







      // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      //   <div className="bg-white rounded-2xl max-w-lg w-full">
      //     <div className="border-b border-gray-100 p-4 rounded-t-2xl flex items-center justify-between">
      //       <h2 className="text-xl font-bold">Completa tu compra</h2>
      //       <button 
      //         onClick={() => setOnClose(false)}
      //         className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      //       >
      //         <X className="w-5 h-5" />
      //       </button>
      //     </div>
  
      //     <form onSubmit={handleSubmit} className="p-6 space-y-6">
      //       <div className="space-y-4">
      //         <div>
      //           <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
      //               Número de teléfono
      //           </label>
      //           <input
      //             type="tel"
      //             id="phone"
      //             name="phone"
      //             value={formData.phone}
      //             onChange={handleChange}
      //             placeholder="Ingrese su número de teléfono"
      //             className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
      //             required
      //           />
      //         </div>
  
      //         <div>
      //           <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
      //               Dirección
      //           </label>
      //           <input
      //             type="text"
      //             id="address"
      //             name="address"
      //             value={formData.address}
      //             onChange={handleChange}
      //             placeholder="Ingrese su dirección"
      //             className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
      //             required
      //           />
      //         </div>
  
      //         <div>
      //           <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
      //               Ciudad
      //           </label>
      //           <input
      //             type="text"
      //             id="city"
      //             name="city"
      //             value={formData.city}
      //             onChange={handleChange}
      //             placeholder="Ingrese su ciudad"
      //             className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
      //             required
      //           />
      //         </div>
  
      //         <div>
      //           <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
      //               País
      //           </label>
      //           <input
      //             type="text"
      //             id="country"
      //             name="country"
      //             value={formData.country}
      //             onChange={handleChange}
      //             placeholder="Ingrese su país"
      //             className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
      //             required
      //           />
      //         </div>
      //       </div>
  
      //       <div className="pt-6 border-t">
      //           <button 
      //           onClick={async(e) => {
      //               e.preventDefault()
      //               await updateDataUserShipment(formData)
      //               console.log('Form submitted:', formData);
      //               handleConfirmPurchase()
      //           }}
      //           type="submit"
      //           className="w-full bg-black text-white py-3 rounded-xl font-semibold 
      //               hover:bg-gray-800 transform hover:scale-[1.02] transition-all duration-200
      //               flex items-center justify-center gap-2"
      //           >
      //             Completar compra
      //             <ArrowRight className="w-5 h-5" />
      //           </button>
      //       </div>
      //     </form>
      //   </div>
      // </div>
    );
  };

  export default CheckoutModal