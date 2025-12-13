import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import themeReducer from './slices/themeSlice';
import authReducer from './slices/authSlice';


export const store = configureStore({
    reducer: {
        user: userReducer,
        theme: themeReducer,
        auth: authReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;