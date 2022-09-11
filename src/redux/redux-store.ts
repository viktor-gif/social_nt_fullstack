import { applyMiddleware, combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk"
import { authReducer } from "./authReducer";
import { dialogsReducer } from "./dialogsReducer";
import { profileReducer } from "./profileReducer";
import { usersReducer } from "./usersReducer";
import { videoReducer } from "./videoReducer";
import { audioReducer } from "./audioReducer";
import { imgReducer } from "./imgReducer";


const rootReducer = combineReducers({
    usersPage: usersReducer,
    auth: authReducer,
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    video: videoReducer,
    audio: audioReducer,
    img: imgReducer
});

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

type PropertiesTypes<T> = T extends{[key: string]: infer U} ? U : never

export type InferActionsTypes<T extends{[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

export const store = configureStore({ 
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

//@ts-ignore
window.store = store

export default store