import { Dispatch } from "react"
import { authAPI } from "../api/auth"
import { profileAPI } from "../api/profile"
import { AuthDataType } from "../ts/auth"
import { ProfileDataType } from "../ts/profile"
import { InferActionsTypes } from "./redux-store"

const SET_AUTH_DATA = 'Viktor-gif/auth/SET_AUTH_DATA'
const SET_LOGIN_ERROR = 'Viktor-gif/users/SET_LOGIN_ERROR'

type InitialStateType = typeof initialState

const initialState = {
    authData: null as AuthDataType | null,
    authProfileData: null as ProfileDataType | null,
    isAuth: false as boolean,
    loginError: null as string | null
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsTypes) => {
    
    switch (action.type) {
        case SET_AUTH_DATA:
            
            return {
                ...state,
                authData: action.payload.data,
                authProfileData: action.payload.profileData,
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
type ActionsTypes = InferActionsTypes<typeof authActions>
// action-creators
export const authActions = {
        setLoginError: (error: string | null) => ({type: SET_LOGIN_ERROR, error} as const),

    setAuthData: (data: AuthDataType | null, profileData: ProfileDataType | null = null, isAuth: boolean = true) => (
        {
            type: SET_AUTH_DATA, payload: {
                data,
                profileData,
                isAuth
        } } as const
    ),
    // setAuthData: (data: AuthDataType | null, isAuth: boolean = true) => (
    //     {
    //         type: SET_AUTH_DATA, payload: {
    //             data,
    //             isAuth
    //     } } as const
    // ),
}

// redux-thunk
type DispatchType = Dispatch<ActionsTypes>


export const authMe = () => async (dispatch: DispatchType) => {
    const res = await authAPI.me()
    const resAuthProfile = await profileAPI.getProfile(res.data.id)
    dispatch(authActions.setAuthData(res.data, resAuthProfile.data, true))
}

export const login = (login: string, email: string, password: string) => async (dispatch: DispatchType) => {
    try {
        dispatch(authActions.setLoginError(null))
        const res = await authAPI.login(login, email, password)
        if (res.data.resultCode === 2) {
            // @ts-ignore
            dispatch(authMe())
        } 
    } catch (err: any) {
        dispatch(authActions.setLoginError(err.response.data.message || "Помилка сервера"))
    }
    
}

export const logout = () => async (dispatch: DispatchType) => {
    try {
    const res = await authAPI.logout()
        
    if (res.data.resultCode === 2) {
        dispatch(authActions.setAuthData(null, null, false))
        //dispatch(authActions.setAuthData(null, false))
    } else if (res.data.resultCode === 5) {
        console.log(res.data.message)
    }
        
    } catch (err) {
        console.log(err);
    }
}
