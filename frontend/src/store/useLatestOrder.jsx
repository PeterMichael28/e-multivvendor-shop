
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
export const useLatestOrder = create(
    persist(
        ( set ) => ( {

        latestOrder: {},
        setLatestOrder: (data) => set({latestOrder: data}),
        resetLatestOrder: () => set({latestOrder: {}})
    }),
    {
      name: 'latestOrder', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
    )
    
)