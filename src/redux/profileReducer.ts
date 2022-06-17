import { Dispatch } from "react"
import { profileAPI } from "../api/profile"
import { ProfileDataType } from "../ts/profile"
import { InferActionsTypes } from "./redux-store"

const SET_PROFILE_DATA = 'Viktor-gif/profile/SET_PROFILE_DATA'
const SET_STATUS = 'Viktor-gif/profile/SET_STATUS'

type InitialStateType = typeof initialState

const initialState = {
    profileData: null as ProfileDataType | null,
    status: null as string | null
}

export const profileReducer = (state: InitialStateType = initialState, action: actionsTypes) => {
    
    switch (action.type) {
        
        case SET_PROFILE_DATA:
            
            return {
                ...state,
                profileData: action.payload
            }
        case SET_STATUS:
            
            return {
                ...state,
                status: action.payload
            }
        default: return state
    }
}

type actionsTypes = InferActionsTypes<typeof profileActions>
// action-creators
export const profileActions = {
    setProfileData: (data: any) => ({ type: SET_PROFILE_DATA, payload: data } as const),
    setStatus: (status: string) => ({ type: SET_STATUS, payload: status } as const),
}

// redux-thunk
type DispatchType = Dispatch<actionsTypes>
export const getStatus = (userId: string) => (dispatch: DispatchType) => {
    profileAPI.getStatus(userId).then(res => {
        dispatch(profileActions.setStatus(res.data.status))
    })
}
export const updateStatus = (status: string) => (dispatch: DispatchType) => {
    profileAPI.updateStatus(status).then(res => {
        console.log(res)
    })
}
export const getProfile = (userId: string) => (dispatch: DispatchType) => {
    profileAPI.getProfile(userId).then(res => {
        dispatch(profileActions.setProfileData(res.data))
    })
}
export const updatePhoto = (photoFile: any) => (dispatch: DispatchType) => {
    profileAPI.updateAvatar(photoFile).then(res => {
        console.log(res)
    })
}
