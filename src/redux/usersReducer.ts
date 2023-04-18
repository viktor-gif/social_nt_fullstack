import { Dispatch } from "react"
import { usersAPI } from "../api/users"
import { login } from "./authReducer"
import { UserType } from "../ts/users"
import { InferActionsTypes } from "./redux-store"

const SET_USERS = 'Viktor-gif/users/SET_USERS'
const SET_TOTAL_USERS_COUNT = 'Viktor-gif/users/SET_TOTAL_USERS_COUNT'
const SET_USERS_ERROR = 'Viktor-gif/users/SET_USERS_ERROR'

type InitialStateType = typeof initialState

const initialState = {
    users: null as UserType[] | null,
    totalUsersCount: null as number | null,
    usersError: null as string | null
}

export const usersReducer = (state: InitialStateType = initialState, action: actionsTypes) => {
    
    switch (action.type) {
        case SET_USERS:
            
            return {
                ...state,
                users: action.users
            }
        case SET_TOTAL_USERS_COUNT:
            
            return {
                ...state,
                totalUsersCount: action.count
            }
        case SET_USERS_ERROR:
            
            return {
                ...state,
                usersError: action.errorMessage
            }
        default: return state
    }
}

type actionsTypes = InferActionsTypes<typeof usersActions>
// action-creators
export const usersActions = {
    setUsers: (users: UserType[]) => ({ type: SET_USERS, users } as const),
    setTotalUsersCount: (count: number) => ({ type: SET_TOTAL_USERS_COUNT, count } as const),
    setUsersError: (errorMessage: string | null) => ({ type: SET_USERS_ERROR, errorMessage } as const)
}

// redux-thunk
type DispatchType = Dispatch<actionsTypes>
export const getUsers = (pageSize: number, currentPage: number, term: string, friendStatus: string) => (dispatch: DispatchType) => {
    usersAPI.getUsers(pageSize, currentPage, term, friendStatus).then(res => {
        
      dispatch(usersActions.setUsers(res.data.items))
      dispatch(usersActions.setTotalUsersCount(res.data.totalCount))
    })
}
export const createUser = (email: string, password: string, fullName: string) =>  async (dispatch: DispatchType) => {
    try {
        const res = await usersAPI.createUser(email, password, fullName)

        if (res.data.resultCode === 0) {
            // @ts-ignore
            dispatch(login(email, password))
            dispatch(usersActions.setUsersError(null))
        }
        
    } catch (err: any) {
        if (err.response.status === 409) {
            dispatch(usersActions.setUsersError(err.response.data.message))
        } else {
        debugger
            dispatch(usersActions.setUsersError("Помилка сервера"))
        }
    }
}
export const getTotalUsersCount = (users: number) => (dispatch: DispatchType) => {

}
