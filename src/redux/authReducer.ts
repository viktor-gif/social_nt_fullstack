import { Dispatch } from "react"
import { authAPI } from "../api/auth"
import { AuthDataType } from "../ts/auth"
import { inferActionsTypes } from "./redux-store"

const SET_AUTH_DATA = 'Viktor-gif/auth/SET_AUTH_DATA'
//const SET_TOTAL_USERS_COUNT = 'Viktor-gif/users/SET_TOTAL_USERS_COUNT'

type InitialStateType = typeof initialState

const initialState = {
    ownerData: null as AuthDataType | null,
    isAuth: false as boolean
}

export const authReducer = (state: InitialStateType = initialState, action: actionsTypes) => {
    
    switch (action.type) {
        case SET_AUTH_DATA:
            
            return {
                ...state,
                ownerData: action.payload,
                isAuth: true
            }
        default: return state
    }
}
type actionsTypes = inferActionsTypes<typeof authActions>
// action-creators
export const authActions = {
    setAuthData: (data: AuthDataType) => ({ type: SET_AUTH_DATA, payload: data } as const),
}

// redux-thunk
type DispatchType = Dispatch<actionsTypes>

export const login = (login: string, email: string, password: string) => (dispatch: DispatchType) => {
    authAPI.login(login, email, password)
        .then(res => {
            authAPI.me().then(res => {
                dispatch(authActions.setAuthData(res.data))
            })
    })
}
export const logout = () => (dispath: DispatchType) => {
    authAPI.logout().then((res) => console.log(res))
}
