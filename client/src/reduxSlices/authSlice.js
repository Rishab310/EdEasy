import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        userId: null,
        adminName:null,
        adminEmail:null,
        error: null,
        loading: true,
        logging: false
    },
    reducers: {
        SET_LOGGING: (state, action) => {
            state.logging = action.payload;
        },

        SET_LOADING: (state, action) => {
            state.loading = action.payload;
        },

        SET_ERROR_NULL: (state, action) => {
            state.error = null;
        },

        SET_ERROR: (state, action) => {
            state.error = action.payload;
        },

        LOGIN: (state, action) => {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.adminName = action.payload.adminName;
            state.adminEmail = action.payload.adminEmail;
        },

        LOGOUT: (state) => {
            state.token = null;
            state.userId = null;
            state.adminEmail = null;
            state.adminName = null;
            localStorage.removeItem("EdEasy__token");
            localStorage.removeItem("EdEasy__userId");
        }
    }
})

export const { LOGIN, LOGOUT, SET_ERROR, SET_ERROR_NULL, SET_LOADING, SET_LOGGING } = authSlice.actions;

export const AUTOLOGIN = () => dispatch => {
  // console.log("Hello");
  dispatch(SET_LOADING(true));
  const token = localStorage.getItem('EdEasy__token');
  // Will verify bearer jwt token with backend
  if(token) {
    const userId = localStorage.getItem('EdEasy__userId');
    dispatch(LOGIN({
      token: token,
      userId: userId,
      adminName: "Jatin Bajaj",
      adminEmail: "jatin@gmail.com"
    }))
    dispatch(SET_LOADING(false));
  } else
    dispatch(SET_LOADING(false));
}

export const ASYNC_LOGIN = userData => dispatch => {
    
  if(userData.logging)
    dispatch(SET_LOGGING(true));
      
  dispatch(SET_LOADING(true));

  const authData = {
    email: userData.email,
    password: userData.password,
  }
  let URL = "http://localhost:5000/auth/signin";
  // console.log(authData);
  axios.post(URL, authData)
  .then(response => {
    console.log(response.data.token);
    const token = response.data.token;
    const userId = response.data.userId;
    // const adminName = response.data.adminName;
    // const adminEmail = response.data.adminEmail;
    localStorage.setItem('EdEasy__token', token);
    localStorage.setItem('EdEasy__userId', userId);
    dispatch(AUTOLOGIN());
    dispatch(SET_LOADING(false));
    dispatch(SET_LOGGING(false));
  })
  .catch(err => {
    // console.log(err);
    console.log(err.message);
    console.log(err.response.data.message);
    dispatch(SET_ERROR(err.response.data.message));
    dispatch(SET_LOADING(false));
    dispatch(SET_LOGGING(false));
  })
}
export const ASYNC_SIGNUP = authData => dispatch => {
    
  if(authData.logging)
      dispatch(SET_LOGGING(true));
      
  dispatch(SET_LOADING(true));

  let URL = "http://localhost:5000/auth/signup";
  console.log(authData);
  axios.post(URL, authData)
  .then(response => {
    console.log(response);
    const token = response.data.token;
    const userId = response.data.userId;
    localStorage.setItem('EdEasy__token', token);
    localStorage.setItem('EdEasy__userId', userId);
    dispatch(AUTOLOGIN());
    dispatch(SET_LOADING(false));
    dispatch(SET_LOGGING(false));
  })
  .catch(err => {
    // console.log(err);
    // console.log(err.message);
    console.log(err.response.data.message);
    dispatch(SET_ERROR(err.response.data.message));
    dispatch(SET_LOADING(false));
    dispatch(SET_LOGGING(false));
  })
}

export const selectUserData = state => state.auth;

export default authSlice.reducer;