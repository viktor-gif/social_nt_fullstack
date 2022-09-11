import { Dispatch } from "react"
import { imgAPI } from "../api/commonImg"
import { ImgDataType } from "../ts/commonImg"
import { InferActionsTypes } from "./redux-store"

type InitialStateType = typeof initialState

const SET_IMG_DATA = 'viktor-gif/commonImg/SET_IMG_DATA'

const initialState = {
    imgData: null as ImgDataType[] | null
}

export const imgReducer = (state: InitialStateType = initialState, action: ActionsTypes) => {
    
    switch (action.type) {
        case SET_IMG_DATA:
            return {
                ...state,
                imgData: action.imgData
            }
        default: return state
    }
}
type ActionsTypes = InferActionsTypes<typeof imgActions>
// action-creators
export const imgActions = {
    setImgData: (imgData: ImgDataType[]) => ({type: SET_IMG_DATA, imgData} as const)
}

// redux-thunk
type DispatchType = Dispatch<ActionsTypes>

export const getImg = (imgType: string, term: string | null) => async (dispatch: DispatchType) => {
    try{
        const res = await imgAPI.getImg(imgType, term)
        console.log(res)
        dispatch(imgActions.setImgData(res.data))
    } catch (err) {
        console.log(err)
    }
}

export const addImg = (title: string | null, isPrivat: boolean, file: any) => async (dispatch: DispatchType) => {
    const res = await imgAPI.addImg(title, isPrivat, file)
    if (res) {
        console.log(res)
    }
}
export const addCommonImg = (imgId: string) => async (dispatch: DispatchType) => {
    const res = await imgAPI.addCommonImg(imgId)
    if (res) {
        console.log(res)
    }
}
