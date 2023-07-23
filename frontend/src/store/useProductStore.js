import axios from "axios";
import { create } from "zustand";
import { server } from "../../server";

export const useProductStore = create( ( set, get ) => ({
    
    product: [],
    loading: false,
    error: null,
    shopProducts: [],
    allProducts: [],
   

    loadProductsSuccess: ( data ) => {
        set({loading: false})
        set( { product: data } );
    },
    loadProductsFail: ( err ) => {
       
        set({loading: false})
        set({error: err})
    },
    loadAllProducts: async () => {
        set({loading: true})
        try {

           
          
          const { data } = await axios.get(
            `${server}/product/get-all-products`, {withCredentials: true}
          );
            
            set({allProducts: data.products})
            set({loading: false})
        } catch (error) {
            const loadProductsFail = get().loadProductsFail
            loadProductsFail(error.response.data.message)
            set({loading: false})
        }
    },
    // get all products of shop

  getAllProductsShop: async (id) => {
    set({loading: true})
    try {
        const { data } = await axios.get(
            `${server}/product/get-all-products-shop/${id}`
          );
        set( { shopProducts: data.products } );
         set({loading: false})
    } catch (error) {
        const loadUserFail = get().loadProductsFail
            loadUserFail(error.response.data.message)
             set({loading: false})
    }
    
},

  // delete product of a shop
 
  deleteProductSuccess: () => {
    
  },
  deleteProductFailed: () => {
   
  },

  // get all products

//   getAllProductsSuccess: async ( ) => {
//     set({loading: true})
//     try {

       
//       let {data} =  await fetch(`${server}/product/getAllProducts`, {withCredentials: true})
        
//         const loadSuccess = get().loadProductsSuccess
//         loadSuccess(data.seller)
//         set({loading: false})
//     } catch (error) {
//         const loadProductsFail = get().loadProductsFail
//         loadProductsFail(error.response.data.message)
//         set({loading: false})
//     }
// },
  getAllProductsFailed: () => {
   
  },
  
  clearErrors: (state) => {
    state.error = null;
  },
}))