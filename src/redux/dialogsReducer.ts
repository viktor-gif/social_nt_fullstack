import { Dispatch } from "react"
import { dialogsAPI } from "../api/dialogs"
import { CurrentDialogInfoType, DialogType, MessageType } from "../ts/dialogs"
import { InferActionsTypes } from "./redux-store"

const SET_DIALOGS = 'Viktor-gif/dialogs/SET_DIALOGS'
const SET_MESSAGES = 'Viktor-gif/dialogs/SET_MESSAGES'
const SET_CURRENT_DIALOG_INFO = 'Viktor-gif/dialogs/SET_CURRENT_DIALOG_INFO'

type InitialStateType = typeof initialState

const initialState = {
    test: 'test',
    dialogs: null as DialogType[] | null,
    messages: null as MessageType[] | null,
    currentDialogInfo: null as CurrentDialogInfoType | null
}

export const dialogsReducer = (state: InitialStateType = initialState, action: actionsTypes) => {
    
    switch (action.type) {
        case SET_DIALOGS:
            
            return {
                ...state,
                dialogs: action.payload
            }
        case SET_MESSAGES:
            return {
                ...state,
                messages: action.payload
            }
        case SET_CURRENT_DIALOG_INFO:
            return {
                ...state,
                currentDialogInfo: action.payload
            }
        default: return state
    }
}

type actionsTypes = InferActionsTypes<typeof dialogsActions>
// action-creators
export const dialogsActions = {
    setDialogs: (dialogs: DialogType[]) => ({ type: SET_DIALOGS, payload: dialogs} as const),
    setMessages: (messages: MessageType[]) => ({ type: SET_MESSAGES, payload: messages} as const),
    setCurrentDialogInfo: (info: CurrentDialogInfoType) => ({ type: SET_CURRENT_DIALOG_INFO, payload: info} as const),
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
export const getDialogMessages = (dialogId: string, userName: string, userImg: string | null) => (dispatch: DispatchType) => {
    dialogsAPI.getDialogMessages(dialogId).then(res => {
        dispatch(dialogsActions.setMessages(res.data))
        console.log(res.data)
        dispatch(dialogsActions.setCurrentDialogInfo({ dialogId, userName, userImg }))
        
    })
}
export const sendDialogMessage = (dialogId: string, userName: string, userImg: string | null, message: string) => (dispatch: DialogType) => {
    dialogsAPI.sendMessage(dialogId, message).then(res => {
        // @ts-ignore
        dispatch(getDialogMessages(dialogId, userName, userImg))
    })
}
export const deleteMessage = (dialogId: string, messageId: string) => (dispatch: DialogType) => {
    dialogsAPI.deleteMessage(dialogId, messageId).then(res => console.log(res))

}
