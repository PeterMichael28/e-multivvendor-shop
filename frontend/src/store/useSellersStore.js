import axios from "axios";
import { create } from "zustand";
import { server } from "../../server";

export const useSellersStore = create( ( set, get ) => ({
    isSeller: false,
    seller: {},
    allSellers: [],
    loading: true,
    error: null,

    loadSellerSuccess: ( data ) => {
        set({isSeller: true})
        set({loading: false})
        set({seller: data})
    },
    loadUserFail: ( err ) => {
        set({isSeller: false})
        set({loading: false})
        set({error: err})
    },
    loadSeller: async () => {
        try {
            set( { loading: true } )
            const {data} = await axios.get(`${server}/shop/getSeller`, {withCredentials: true})
            const loadSuccess = get().loadSellerSuccess
            loadSuccess(data.seller)
        } catch (error) {
            const loadUserFail = get().loadUserFail
            loadUserFail(error.response.data.message)
        }
        },
    logOutSeller: async () => {
        set({seller: null})
        set({isSeller: false})
        set({loading: false})
    },


    // admin
    getAllSellers: async () => {
        try {
            set( { loading: true } )
            const { data } = await axios.get(`${server}/shop/admin-all-sellers`, {
                withCredentials: true,
              });
              set( { loading: false } )
              set( { allSellers: data.sellers } )
            
        } catch (error) {
            set({loading: false})
        set({error: error})
        }
      
    },
  

}))