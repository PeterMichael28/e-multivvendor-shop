import axios from "axios";
import { create } from "zustand";
import { server } from "../../server";

export const useOrderStore = create( ( set ) => ({
   
    userOrders: [],
    adminOrders: [],
    loading: true,
    error: null,
    shopOrders: [],

    getAllOrdersOfUser: async ( id ) => {
        
        set({loading: true})
        try {
            const { data } = await axios.get(
                `${server}/order/get-all-orders/${id}`
              );
             
              set({loading: false})
              set({userOrders: data.orders})
        } catch ( error ) {
         
            set({loading: false})
            set({error: error})
        }
    },

    getAllOrdersOfShop: async ( id ) => {
        set({loading: true})
        try {
            const { data } = await axios.get(
                `${server}/order/get-seller-all-orders/${id}`
              );
              set({loading: false})
              set({shopOrders: data.orders})
        } catch ( error ) {
            set({loading: false})
            set({error: error})
        }
    },
    
    getAllOrdersOfAdmin: async () => {
        set({loading: true})
        try {
            const { data } = await axios.get(`${server}/order/admin-all-orders`, {
                withCredentials: true,
              });
              set({loading: false})
              set({adminOrders: data.orders})
        } catch ( error ) {
            set({loading: false})
            set({error: error})
        }
    },
    
}))