import { Dispatch } from "react"
import { dialogsAPI } from "../api/dialogs"
import { DialogType } from "../ts/dialogs"
import { InferActionsTypes } from "./redux-store"

const SET_DIALOGS = 'Viktor-gif/dialogs/SET_DIALOGS'

type InitialStateType = typeof initialState

const initialState = {
    dialogs: null as DialogType[] | null,
}

export const dialogsReducer = (state: InitialStateType = initialState, action: actionsTypes) => {
    
    switch (action.type) {
        case SET_DIALOGS:
            
            return {
                ...state,
                dialogs: action.payload
            }
        default: return state
    }
}

type actionsTypes = InferActionsTypes<typeof dialogsActions>
// action-creators
export const dialogsActions = {
    setDialogs: (dialogs: DialogType[]) => ({ type: SET_DIALOGS, payload: dialogs} as const),
}

// redux-thunk
type DispatchType = Dispatch<actionsTypes>
export const getDialogs = () => (dispatch: DispatchType) => {
    dialogsAPI.getDialogs().then(res => {
        dispatch(dialogsActions.setDialogs(res.data.items))
    })
}
export const createDialog = (userId: string) => (diapatch: DispatchType) => {
    dialogsAPI.createDialog(userId).then(res => {
        console.log(res)
    })
}
