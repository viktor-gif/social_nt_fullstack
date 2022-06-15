import { combineReducers, createStore } from "redux";
import { authReducer } from "./authReducer";
import { profileReducer } from "./profileReducer";
import { usersReducer } from "./usersReducer";


const rootReducer = combineReducers({
    usersPage: usersReducer,
    auth: authReducer,
    profilePage: profileReducer
});

type rootReducerType = typeof rootReducer
export type appStateType = ReturnType<rootReducerType>

type propertiesTypes<T> = T extends{[key: string]: infer U} ? U : never

export type inferActionsTypes<T extends{[key: string]: (...args: any[]) => any}> = ReturnType<propertiesTypes<T>>

export const store = createStore(rootReducer);

//@ts-ignore
window.store = store

export default store