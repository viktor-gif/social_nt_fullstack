import { Dispatch } from "react"
import { dialogsAPI } from "../api/dialogs"
import { DialogType, MessageType } from "../ts/dialogs"
import { InferActionsTypes } from "./redux-store"

const SET_DIALOGS = 'Viktor-gif/dialogs/SET_DIALOGS'
const SET_MESSAGES = 'Viktor-gif/dialogs/SET_MESSAGES'

type InitialStateType = typeof initialState

const initialState = {
    dialogs: null as DialogType[] | null,
    messages: null as MessageType[] | null
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
        default: return state
    }
}

type actionsTypes = InferActionsTypes<typeof dialogsActions>
// action-creators
export const dialogsActions = {
    setDialogs: (dialogs: DialogType[]) => ({ type: SET_DIALOGS, payload: dialogs} as const),
    setMessages: (messages: MessageType[]) => ({ type: SET_MESSAGES, payload: messages} as const),
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
export const getDialogMessages = (dialogId: string) => (dispatch: DispatchType) => {
    dialogsAPI.getDialogMessages(dialogId).then(res => {
        dispatch(dialogsActions.setMessages(res.data))
    })
}
export const sendDialogMessage = (dialogId: string, message: string) => (dispatch: DialogType) => {
    dialogsAPI.sendMessage(dialogId, message).then(res => {
        // @ts-ignore
        dispatch(getDialogMessages(dialogId))
    })
}
export const deleteMessage = (dialogId: string, messageId: string) => (dispatch: DialogType) => {
    dialogsAPI.deleteMessage(dialogId, messageId).then(res => console.log(res))

}
export const setAsSpam = (dialogId: string, messageId: string) => async (dispatch: DispatchType) => {
    const res = await dialogsAPI.setAsSpam(dialogId, messageId)
    if (res.data.statusCode === 2) {
        console.log(res.data.message)
    }
}
export const restoreFromSpam = (dialogId: string, messageId: string) => async (dispatch: DispatchType) => {
    const res = await dialogsAPI.restoreFromSpam(dialogId, messageId)
    if (res.data.statusCode === 2) {
        console.log(res.data.message)
    }
}
export const setViewed = (dialogId: string, messageId: string, senderId: string) => async (dispatch: DispatchType) => {
    const res = await dialogsAPI.setViewed(dialogId, messageId, senderId)
    if (res.data.statusCode === 2) {
        console.log(res.data.message)
    }
}
