import { Dispatch } from "react"
import { authAPI } from "../api/auth"
import { AuthDataType } from "../ts/auth"
import { InferActionsTypes } from "./redux-store"

const SET_AUTH_DATA = 'Viktor-gif/auth/SET_AUTH_DATA'
const SET_LOGIN_ERROR = 'Viktor-gif/users/SET_LOGIN_ERROR'

type InitialStateType = typeof initialState

const initialState = {
    ownerData: null as AuthDataType | null,
    isAuth: false as boolean,
    loginError: null as string | null
}

export const authReducer = (state: InitialStateType = initialState, action: actionsTypes) => {
    
    switch (action.type) {
        case SET_AUTH_DATA:
            
            return {
                ...state,
                ownerData: action.payload.data,
                isAuth: action.payload.isAuth
            }
        case SET_LOGIN_ERROR:
            return {
                ...state,
                loginError: action.error
            }
        default: return state
    }
}
type actionsTypes = InferActionsTypes<typeof authActions>
// action-creators
export const authActions = {
    setAuthData: (data: AuthDataType | null, isAuth: boolean = true) => ({ type: SET_AUTH_DATA, payload: { data, isAuth } } as const),
    setLoginError: (error: string | null) => ({type: SET_LOGIN_ERROR, error} as const)
}

// redux-thunk
type DispatchType = Dispatch<actionsTypes>


export const login = (login: string, email: string, password: string) => async (dispatch: DispatchType) => {
    try {
        dispatch(authActions.setLoginError(null))
        const res = await authAPI.login(login, email, password)
        if (res.data.resultCode === 2) {
            const res = await authAPI.me()
            console.log(res);
            dispatch(authActions.setAuthData(res.data, true))
        } 
    } catch (err: any) {
        dispatch(authActions.setLoginError(err.response.data.message || "Помилка сервера"))
    }
    
}
export const logout = () => async (dispatch: DispatchType) => {
    try {
    const res = await authAPI.logout()
        
    if (res.data.resultCode === 2) {
        dispatch(authActions.setAuthData(null, false))
    } else if (res.data.resultCode === 5) {
        console.log(res.data.message)
    }
        
    } catch (err) {
        console.log(err);
    }
}
