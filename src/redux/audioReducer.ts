import { Dispatch } from "react"
import { audioAPI } from "../api/commonAudio"
import { videoAPI } from "../api/commonVideo"
import { AudioDataType } from "../ts/commonAudio"
import { InferActionsTypes } from "./redux-store"

type InitialStateType = typeof initialState

const SET_AUDIO_DATA = 'viktor-gif/commonAudio/SET_AUDIO_DATA'

const initialState = {
    audioData: null as AudioDataType[] | null
}

export const audioReducer = (state: InitialStateType = initialState, action: ActionsTypes) => {
    
    switch (action.type) {
        case SET_AUDIO_DATA:
            return {
                ...state,
                audioData: action.audioData
            }
        default: return state
    }
}
type ActionsTypes = InferActionsTypes<typeof audioActions>
// action-creators
export const audioActions = {
    setAudioData: (audioData: AudioDataType[]) => ({type: SET_AUDIO_DATA, audioData} as const)
}

// redux-thunk
type DispatchType = Dispatch<ActionsTypes>

export const getAudio = (audioType: string, term: string | null) => async (dispatch: DispatchType) => {
    try{
        const res = await audioAPI.getAudio(audioType, term)
        console.log(res)
        dispatch(audioActions.setAudioData(res.data))
    } catch (err) {
        console.log(err)
    }
}

export const addAudio = (title: string | null, isPrivat: boolean, file: any) => async (dispatch: DispatchType) => {
    const res = await audioAPI.addAudio(title, isPrivat, file)
    if (res) {
        console.log(res)
    }
}
export const addCommonAudio = (audioId: string) => async (dispatch: DispatchType) => {
    const res = await audioAPI.addCommonAudio(audioId)
    if (res) {
        console.log(res)
    }
}
