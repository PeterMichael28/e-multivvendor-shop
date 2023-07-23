import axios from "axios";
import { create } from "zustand";
import { server } from "../../server";

export const useEventStore = create( ( set, get ) => ({
    
    event: [],
    loading: false,
    error: null,
    shopEvents: [],
    allEvents: [],
   

    loadEventsSuccess: ( data ) => {
        set({loading: false})
        set( { Event: data } );
    },
    loadEventsFail: ( err ) => {
       
        set({loading: false})
        set({error: err})
    },
    loadAllEvents: async () => {
        set({loading: true})
        try {

           
          
          const { data } = await axios.get(
            `${server}/event/get-all-events`, {withCredentials: true}
          );
            console.log(data)
            set({allEvents: data.events})
            set({loading: false})
        } catch (error) {
            const loadEventsFail = get().loadEventsFail
            loadEventsFail(error.response.data.message)
            set({loading: false})
        }
    },
    // get all Events of shop

  getAllEventsShop: async (id) => {
    set({loading: true})
    try {
        const { data } = await axios.get(
            `${server}/event/get-all-events/${id}`
          );
        set( { shopEvents: data.events } );
         set({loading: false})
    } catch (error) {
        const loadUserFail = get().loadEventsFail
            loadUserFail(error.response.data.message)
             set({loading: false})
    }
    
},


  getAllEventsFailed: () => {
   
  },
  
  clearErrors: (state) => {
    state.error = null;
  },
}))