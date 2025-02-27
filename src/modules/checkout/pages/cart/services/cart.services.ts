import axios from "axios";
import { IFilteredCart } from "../interfaces/Cart.interface";
import { API_BACK } from "@/shared/config/api/getEnv";


export const confirmOrderService = async (userBuyer: string, filteredCart: IFilteredCart[], token: string | null) => {
    try {
        const body = {
            userId: userBuyer,
            products: filteredCart.map(({ id, units }) => ({
                id,
                quantity: units
            }))
        };
        
        console.log(body, token);
        

        const { data } = await axios.post(`${API_BACK}/orders`, body, 
            { 
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                }
            }
        );

        return data;
    } catch (error) {
        console.error("Error confirming order:", error);
        throw error;
    }
};