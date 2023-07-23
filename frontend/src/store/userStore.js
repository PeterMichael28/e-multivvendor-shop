import axios from "axios";
import { create } from "zustand";
import { server } from "../../server";
import { persist, createJSONStorage } from 'zustand/middleware'
export const userStore = create(
    persist(
        ( set, get ) => ( {

        isAuthenticated: false,
        loading: false,
        user: null,
        error: null,
        allUsers: [],
        loadUserRequest: () => set( { loading: true } ),
        loadUserSuccess: ( user ) => {
            set({loading: false})
            set({isAuthenticated: true})
            set( { user } );
        },
        loadUserFail: (error) => {
            set({loading: false})
            set({isAuthenticated: false})
            set( { error } );
        },
        updateUser: (data) => {
            set({loading: false})
            set( { user: data } );
        },
        clearError: () => set({error: null}),
        loadUser: async () => {
            try {
                set( { loading: true } )
                const {data} = await axios.get(`${server}/user/getUser`, {withCredentials: true})
                const loadSuccess = get().loadUserSuccess
                loadSuccess(data.user)
            } catch (error) {
                const loadFailed = get().loadUserFail
                loadFailed(error.response.data.message)
            }
    
            
            },
            loadAllUsers: async () => {
                try {
                    set( { loading: true } )
                    const { data } = await axios.get(`${server}/user/admin-all-users`, {
                        withCredentials: true,
                      });
                    set( { loading: false } )
              set( { allUsers: data.users } )
              
              


                } catch (error) {
                    set({loading: false})
                    set({error: error})
                }
        
                
                },
        logOutUser: async () => {
            set({user: null})
            set({isAuthenticated: false})
            set({loading: false})
        }
    
    }),
    {
      name: 'userDetails', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
    )
    
)