import { UserType } from "../ts/users"
import { inferActionsTypes } from "./redux-store"

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

type actionsTypes = inferActionsTypes<typeof usersActions>
// action-creators
export const usersActions = {
    setUsers: (users: UserType[]) => ({ type: SET_USERS, users } as const),
    setTotalUsersCount: (count: number) => ({type: SET_TOTAL_USERS_COUNT, count} as const)
}
