import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reduxSlices/authSlice';

export default configureStore({  
    reducer: {
        auth: authReducer
    }
});