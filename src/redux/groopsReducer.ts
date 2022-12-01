import { Dispatch } from "react"
import { groopsAPI } from "../api/groops"
import { InferActionsTypes } from "./redux-store"

const SET_GROOPS = 'Viktor-gif/groops/SET_GROOPS'

type InitialStateType = typeof initialState

const initialState = {
    groopsData: null as any,
}

export const groopsReducer = (state: InitialStateType = initialState, action: ActionsTypes) => {
    
    switch (action.type) {
        case SET_GROOPS:
            
            return {
                ...state,
                groopsData: action.data
            }
        default: return state
    }
}
type ActionsTypes = InferActionsTypes<typeof groopsActions>
// action-creators
export const groopsActions = {
    setGroopsData: (data: any) => ({type: SET_GROOPS, data} as const),
}

// redux-thunk
type DispatchType = Dispatch<ActionsTypes>


export const getGroops = () => async (dispatch: DispatchType) => {
    // debugger
    const response = await groopsAPI.getGroops()
    // @ts-ignore
    dispatch(groopsActions.setGroopsData(response.data))
}

export const createGroop = (authorId: string, title: string, groopType: string) => async (dispatch: DispatchType) => {
    // debugger
    const response = await groopsAPI.createGroop(authorId, title, groopType)
    console.log(response)
    // @ts-ignore
}