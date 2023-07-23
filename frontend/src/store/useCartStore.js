import axios from "axios";
import { create } from "zustand";
import { server } from "../../server";
import { persist, createJSONStorage } from 'zustand/middleware'
export const useCartStore = create(
    persist(
        ( set, get ) => ( {

        cart: [],
        addToCart: (item) => {
            let cart = get().cart
          
            const isExists = cart.find(i => i._id === item._id)
            if ( isExists ) {
               const otherCartItems = cart.filter(i => i._id !== item._id)
                set({cart: [...otherCartItems, item]})
                return
            } else {
                set( state => ( {
                    cart: [...state.cart, item]
                }))
                return
            }
            
            

           
        },
        removeFromCart: (id) => {
            let cart = get().cart
            const isExists = cart.find(i => i._id === id)
            if(!isExists) return
            cart = cart.filter(i => i._id !== id)
            set({cart})
        },
        resetCart: () => set({cart: []})
    
    }),
    {
      name: 'cartItems', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
    )
    
)