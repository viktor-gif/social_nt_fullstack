import { Dispatch } from "react"
import { profileAPI } from "../api/profile"
import { profileDataType } from "../ts/profile"
import { inferActionsTypes } from "./redux-store"

const SET_PROFILE_DATA = 'Viktor-gif/users/SET_PROFILE_DATA'

type InitialStateType = typeof initialState

const initialState = {
    profileData: null as profileDataType | null
}

export const profileReducer = (state: InitialStateType = initialState, action: actionsTypes) => {
    
    switch (action.type) {
        
        case SET_PROFILE_DATA:
            
            return {
                ...state,
                profileData: action.payload
            }
        default: return state
    }
}

type actionsTypes = inferActionsTypes<typeof profileActions>
// action-creators
export const profileActions = {
    setProfileData: (data: any) => ({ type: SET_PROFILE_DATA, payload: data } as const),
}

// redux-thunk
type DispatchType = Dispatch<actionsTypes>
export const getProfile = (userId: string) => (dispatch: DispatchType) => {
    profileAPI.getProfile(userId).then(res => {
        dispatch(profileActions.setProfileData(res.data))
    })
}
