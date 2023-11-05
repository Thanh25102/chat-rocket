import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authSlice} from "Frontend/redux/feat/auth/authSlice";
import {chatSlice} from "Frontend/redux/feat/chat/chatSlice";

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    chat: chatSlice.reducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            thunk: {
                extraArgument: {}
            }
        }),

})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

