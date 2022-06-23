import { Dispatch } from "react"
import { dialogsAPI } from "../api/dialogs"
import { usersAPI } from "../api/users"
import { UserType } from "../ts/users"
import { InferActionsTypes } from "./redux-store"

const SET_DIALOGS = 'Viktor-gif/dialogs/SET_DIALOGS'
const SET_TOTAL_USERS_COUNT = 'Viktor-gif/dialogs/SET_TOTAL_USERS_COUNT'

type InitialStateType = typeof initialState

const initialState = {
    dialogs: null as UserType[] | null,
}

export const dialogsReducer = (state: InitialStateType = initialState, action: actionsTypes) => {
    
    switch (action.type) {
        case SET_DIALOGS:
            
            return {
                ...state,
            }
        default: return state
    }
}

type actionsTypes = InferActionsTypes<typeof dialogsActions>
// action-creators
export const dialogsActions = {
    setDialogs: () => ({ type: SET_DIALOGS} as const),
}

// redux-thunk
type DispatchType = Dispatch<actionsTypes>
export const getDialogs = () => (dispatch: DispatchType) => {
    // dialogsAPI.getUsers(pageSize, currentPage, term).then(res => {
    //   dispatch(usersActions.setUsers(res.data.items))
    //   dispatch(usersActions.setTotalUsersCount(res.data.totalCount))
    // })
}
export const createDialog = (userId: string) => (diapatch: DispatchType) => {
    dialogsAPI.createDialog(userId).then(res => {
        console.log(res)
    })
}
