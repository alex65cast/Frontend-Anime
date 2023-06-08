
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
      credentials: {}
    },
    reducers: {
      login: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
      logout: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }
      
    }
    
});

//exporto las ACCIONES.....

//Exporto las acciones para el modo ESCRITURA
export const { login, logout } = userSlice.actions;


//exporto el método para el modo LECTURA
export const userData = (state) => state.user;

export default userSlice.reducer;