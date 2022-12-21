import { Dispatch } from "react"
import { groopsAPI } from "../api/groops"
import { GroopType } from "../ts/groops"
import { InferActionsTypes } from "./redux-store"

const SET_GROOPS = 'Viktor-gif/groops/SET_GROOPS'
const SET_GROOP_INFO = 'Viktor-gif/groops/SET_GROOP_INFO'

type InitialStateType = typeof initialState

const initialState = {
    groopsData: null as any,
    groopInfo: null as GroopType | null
}

export const groopsReducer = (state: InitialStateType = initialState, action: ActionsTypes) => {
    
    switch (action.type) {
        case SET_GROOPS:
            
            return {
                ...state,
                groopsData: action.data
            }
        case SET_GROOP_INFO:
            
            return {
                ...state,
                groopInfo: action.info
            }
        default: return state
    }
}
type ActionsTypes = InferActionsTypes<typeof groopsActions>
// action-creators
export const groopsActions = {
    setGroopsData: (data: any) => ({type: SET_GROOPS, data} as const),
    setGroopInfo: (info: GroopType) => ({type: SET_GROOP_INFO, info} as const),
}

// redux-thunk
type DispatchType = Dispatch<ActionsTypes>


export const getGroops = () => async (dispatch: DispatchType) => {
    // debugger
    const response = await groopsAPI.getGroops()

    dispatch(groopsActions.setGroopsData(response.data))
}

export const getGroopInfo = (groopId: string) => async (dispatch: DispatchType) => {
    // debugger
    const response = await groopsAPI.getGroopInfo(groopId)
    
    dispatch(groopsActions.setGroopInfo(response.data))
}

export const createGroop = (authorId: string, title: string, groopType: string) => async (dispatch: DispatchType) => {
    // debugger
    const response = await groopsAPI.createGroop(authorId, title, groopType)
}

export const addFollower = (groopId: string) => async (dispatch: DispatchType) => {
    // debugger
    const response = await groopsAPI.addFollower(groopId)
    console.log(response.data)
}
export const deleteFollower = (groopId: string) => async (dispatch: DispatchType) => {
    // debugger
    const response = await groopsAPI.deleteFollower(groopId)
    console.log(response.data)
}