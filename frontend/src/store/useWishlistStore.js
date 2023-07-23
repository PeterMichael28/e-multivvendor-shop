
import axios from "axios";
import { create } from "zustand";
import { server } from "../../server";
import { persist, createJSONStorage } from 'zustand/middleware'
export const useWishlistStore = create(
    persist(
        ( set, get ) => ( {

        wishlists: [],
        addToWishlist: (item) => {
            let wishlists = get().wishlists
          
            const isExists = wishlists.find(i => i._id === item._id)
            if ( isExists ) {
               const otherWishlistsItems = wishlists.filter(i => i._id !== item._id)
                set({wishlists: [...otherWishlistsItems, item]})
                return
            } else {
                set( state => ( {
                    wishlists: [...state.wishlists, item]
                }))
                return
            }
            
            

           
        },
        removeFromWishlist: (id) => {
            let wishlists = get().wishlists
            const isExists = wishlists.find(i => i._id === id)
            if(!isExists) return
            wishlists = wishlists.filter(i => i._id !== id)
            set({wishlists})
        },
        resetwishlists: () => set({wishlists: []})
    
    }),
    {
      name: 'wishlistItems', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
    )
    
)