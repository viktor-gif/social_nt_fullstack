import { Dispatch } from "react"
import { usersAPI } from "../api/users"
import { login } from "./authReducer"
import { UserType } from "../ts/users"
import { InferActionsTypes } from "./redux-store"

const SET_USERS = 'Viktor-gif/users/SET_USERS'
const SET_TOTAL_USERS_COUNT = 'Viktor-gif/users/SET_TOTAL_USERS_COUNT'

type InitialStateType = typeof initialState

const initialState = {
    users: null as UserType[] | null,
    totalUsersCount: null as number | null
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
        default: return state
    }
}

type actionsTypes = InferActionsTypes<typeof usersActions>
// action-creators
export const usersActions = {
    setUsers: (users: UserType[]) => ({ type: SET_USERS, users } as const),
    setTotalUsersCount: (count: number) => ({ type: SET_TOTAL_USERS_COUNT, count } as const)
}

// redux-thunk
type DispatchType = Dispatch<actionsTypes>
export const getUsers = (pageSize: number, currentPage: number, term: string, friendStatus: string) => (dispatch: DispatchType) => {
    usersAPI.getUsers(pageSize, currentPage, term, friendStatus).then(res => {
        
      dispatch(usersActions.setUsers(res.data.items))
      dispatch(usersActions.setTotalUsersCount(res.data.totalCount))
    })
}
export const createUser = (email: string, password: string, fullName: string) => (dispatch: DispatchType) => {
    usersAPI.createUser(email, password, fullName).then(res => {
        
        if (res.data.resultCode === 0) {
            // @ts-ignore
            dispatch(login(email, password))
        }
      dispatch(usersActions.setUsers(res.data.items))
      dispatch(usersActions.setTotalUsersCount(res.data.totalCount))
    })
}
export const getTotalUsersCount = (users: number) => (dispatch: DispatchType) => {

}
