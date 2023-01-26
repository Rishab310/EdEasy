import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        userId: null,
        userName:null,
        userEmail:null,
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
            state.userName = action.payload.userName;
            state.userEmail = action.payload.userEmail;
        },

        LOGOUT: (state, action) => {
            state.token = null;
            state.userId = null;
            state.userEmail = null;
            state.userName = null;
            localStorage.removeItem("EdEasy__token");
            localStorage.removeItem("EdEasy__userId");
            localStorage.removeItem("EdEasy__userName");
            localStorage.removeItem("EdEasy__userEmail");
        }
    }
})

export const { LOGIN, LOGOUT, SET_ERROR, SET_ERROR_NULL, SET_LOADING, SET_LOGGING } = authSlice.actions;

export const AUTOLOGIN = () => async dispatch => {
  // console.log("Hello");
  dispatch(SET_LOADING(true));
  const token = localStorage.getItem('EdEasy__token');
  // Will verify bearer jwt token with backend
  if(token) {
    const userId = localStorage.getItem('EdEasy__userId');
    const userName = localStorage.getItem('EdEasy__userName');
    const userEmail = localStorage.getItem('EdEasy__userEmail');
    await axios.post("https://edeasy.onrender.com/auth/verifyToken",{ token: token })
    .then((res)=>{
      dispatch(LOGIN({
        token: token,
        userId: userId,
        userName: userName,
        userEmail: userEmail
      }))
    })
    .catch(err => {
      console.log(err);
      dispatch(LOGOUT());
    })
    dispatch(SET_LOADING(false));
  } else
    dispatch(SET_LOADING(false));
}

export const ASYNC_LOGIN = userData => dispatch => {
  dispatch(SET_LOGGING(true));    

  const authData = {
    email: userData.email,
    password: userData.password,
  }
  let URL = "https://edeasy.onrender.com/auth/signin";
  axios.post(URL, authData)
  .then(response => {
    const token = response.data.token;
    const userId = response.data.userId;
    localStorage.setItem('EdEasy__token', token);
    localStorage.setItem('EdEasy__userId', userId);
    localStorage.setItem('EdEasy__userEmail', response.data.userEmail);
    localStorage.setItem('EdEasy__userName', response.data.userName);
    dispatch(AUTOLOGIN());
    dispatch(SET_LOADING(false));
    dispatch(SET_LOGGING(false));
  })
  .catch(err => {
    if (err.response && err.response.data) {
      console.log(err.response.data.message);
      dispatch(SET_ERROR(err.response.data.message));
    }
    dispatch(SET_LOADING(false));
    dispatch(SET_LOGGING(false));
  })
}

export const ASYNC_SIGNUP = authData => dispatch => {
  dispatch(SET_LOGGING(true));

  let URL = "https://edeasy.onrender.com/auth/signup";
  axios.post(URL, authData)
  .then(response => {
    const token = response.data.token;
    const userId = response.data.userId;
    localStorage.setItem('EdEasy__token', token);
    localStorage.setItem('EdEasy__userId', userId);
    localStorage.setItem('EdEasy__userEmail', response.data.userEmail);
    localStorage.setItem('EdEasy__userName', response.data.userName);
    dispatch(AUTOLOGIN());
    dispatch(SET_LOGGING(false));
  })
  .catch(err => {
    if (err.response && err.response.data) {
      console.log(err.response.data.message);
      dispatch(SET_ERROR(err.response.data.message));
    }
    dispatch(SET_LOADING(false));
    dispatch(SET_LOGGING(false));
  })
}

export const selectUserData = state => state.auth;

export default authSlice.reducer;