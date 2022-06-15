import { profileDataType } from "../ts/profile"
import { UserType } from "../ts/users"
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
