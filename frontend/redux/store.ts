import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authSlice} from "Frontend/redux/feat/auth/authSlice";


export const store = configureStore({
    reducer:combineReducers({
        auth: authSlice.reducer
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            thunk: {
                extraArgument: {
                    chatSocket: undefined
                }
            }
        }),

})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

