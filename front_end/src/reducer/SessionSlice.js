// sessionSlice.js
import { createSlice } from '@reduxjs/toolkit';

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    user: [{UserName:'empty', UserID:123}],
    userIsLoggedIn: false
    // other session-related data
  },


  // set user with the given login info
  reducers: {
    setUserReducer: (state, action) => {
      state.user = action.payload;
      state.userIsLoggedIn = true;
    },


    // reset user login info
    resetUserReducer: (state)=>{
        state.userIsLoggedIn = [{UserName:'empty', UserID:123}];
        state.userIsLoggedIn = false;
    }
    // other reducers for session management
  },
});

export const { resetUserReducer, setUserReducer } = sessionSlice.actions;
export default sessionSlice.reducer;
