import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk"
import { authReducer } from "./authReducer";
import { dialogsReducer } from "./dialogsReducer";
import { profileReducer } from "./profileReducer";
import { usersReducer } from "./usersReducer";


const rootReducer = combineReducers({
    usersPage: usersReducer,
    auth: authReducer,
    profilePage: profileReducer,
    dialogsPage: dialogsReducer
});

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

type PropertiesTypes<T> = T extends{[key: string]: infer U} ? U : never

export type InferActionsTypes<T extends{[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

export const store = createStore(rootReducer, applyMiddleware(thunk));

//@ts-ignore
window.store = store

export default store