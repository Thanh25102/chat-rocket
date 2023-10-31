import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authSlice} from "Frontend/redux/feat/auth/authSlice";
import {chatSlice} from "Frontend/redux/feat/chat/chatSlice";


export const store = configureStore({
    reducer: combineReducers({
        auth: authSlice.reducer,
        chat: chatSlice.reducer
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

