import { Dispatch } from "react"
import { videoAPI } from "../api/commonVideo"
import { VideoDataType } from "../ts/commonVideo"
import { InferActionsTypes } from "./redux-store"

type InitialStateType = typeof initialState

const SET_VIDEO_DATA = 'viktor-gif/commonVideo/SET_VIDEO_DATA'

const initialState = {
    videoData: null as VideoDataType[] | null
}

export const videoReducer = (state: InitialStateType = initialState, action: ActionsTypes) => {
    
    switch (action.type) {
        case SET_VIDEO_DATA:
            return {
                ...state,
                videoData: action.videoData
            }
        default: return state
    }
}
type ActionsTypes = InferActionsTypes<typeof videoActions>
// action-creators
export const videoActions = {
    setVideoData: (videoData: VideoDataType[]) => ({type: SET_VIDEO_DATA, videoData} as const)
}

// redux-thunk
type DispatchType = Dispatch<ActionsTypes>

export const getVideo = (videoType: string, term: string | null) => async (dispatch: DispatchType) => {
    try{
        const res = await videoAPI.getVideo(videoType, term)
        console.log(res)
        dispatch(videoActions.setVideoData(res.data))
    } catch (err) {
        console.log(err)
    }
}

export const addVideo = (title: string | null, isPrivat: boolean, file: any) => async (dispatch: DispatchType) => {
    const res = await videoAPI.addVideo(title, isPrivat, file)
    if (res) {
        console.log(res)
    }
}
export const addCommonVideo = (videoId: string) => async (dispatch: DispatchType) => {
    const res = await videoAPI.addCommonVideo(videoId)
    if (res) {
        console.log(res)
    }
}
