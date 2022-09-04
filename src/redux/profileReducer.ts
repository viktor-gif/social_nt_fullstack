import { stringify } from "querystring"
import { Dispatch } from "react"
import { postsAPI } from "../api/posts"
import { profileAPI } from "../api/profile"
import { PostType } from "../ts/posts"
import { ProfileDataType } from "../ts/profile"
import { InferActionsTypes } from "./redux-store"

const SET_PROFILE_DATA = 'Viktor-gif/profile/SET_PROFILE_DATA'
const SET_STATUS = 'Viktor-gif/profile/SET_STATUS'
const SET_POSTS = 'Viktor-gif/profile/SET_POSTS'

type InitialStateType = typeof initialState

const initialState = {
    profileData: null as ProfileDataType | null,
    status: null as string | null,
    posts: [] as PostType[]
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
        case SET_POSTS:
            
            return {
                ...state,
                posts: action.payload
            }
        default: return state
    }
}

type actionsTypes = InferActionsTypes<typeof profileActions>
// action-creators
export const profileActions = {
    setProfileData: (data: any) => ({ type: SET_PROFILE_DATA, payload: data } as const),
    setStatus: (status: string) => ({ type: SET_STATUS, payload: status } as const),
    setPosts: (data: PostType[]) => ({ type: SET_POSTS, payload: data } as const),
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
export const updatePhoto = (photoFile: any, userId: string) => (dispatch: DispatchType) => {
    profileAPI.updateAvatar(photoFile).then(res => {
        // @ts-ignore
        dispatch(getProfile(userId))
    })
}
export const updateProfile = (data: ProfileDataType) => (dispatch: DispatchType) => {
    profileAPI.updateProfile(data).then(res => {
        console.log(res)
    })
}
export const getPosts = (userId: string) => (dispatch: DispatchType) => {
    postsAPI.getPosts(userId).then(res => {
        dispatch(profileActions.setPosts(res.data))
    })
}
export const addPost = (userId: string, postText: string, file: any) => async (dispatch: DispatchType) => {
    const res = await postsAPI.createPost(userId, postText, file)
    if (res.data.resultCode === 2) {
        // @ts-ignore
        dispatch(getPosts(userId))
    }
}
export const deletePost = (postId: string, userId: string) => async (dispatch: DispatchType) => {
    const res = await postsAPI.deletePost(postId)
    if (res.data.resultCode === 2) {
        // @ts-ignore
        dispatch(getPosts(userId))
    }
}
export const updatePost = (postId: string, postText: string, file: any, userId: string) => async (dispatch: DispatchType) => {
    const res = await postsAPI.updatePost(postId, postText, file)
    if (res.data.resultCode === 2) {
        // @ts-ignore
        dispatch(getPosts(userId))
    }
}
export const toggleLike = (postId: string, userId: string) => async (dispatch: DispatchType) => {
    const res = await postsAPI.toggleLike(postId)
    if (res.data.resultCode === 2) {
        // @ts-ignore
        dispatch(getPosts(userId))
    }
}
export const addComment = (postId: string, userId: string, commentText: string, file: any, linkToAnotherComment: string | null = null) => async (dispatch: DispatchType) => {

    const res = await postsAPI.addComment(postId, commentText, file, linkToAnotherComment)
    if (res.data.resultCode === 2) {
        // @ts-ignore
        dispatch(getPosts(userId))
    }
}
export const updateComment = (postId: string, commentId: string, commentText: string, file: any, userId: string) => async (dispatch: DispatchType) => {
    
    const res = await postsAPI.updateComment(postId, commentId, commentText, file)
    
    console.log(res.data)
    if (res.data.resultCode === 2) {
        // @ts-ignore
        dispatch(getPosts(userId))
    }
}
export const deleteComment = (postId: string, commentId: string, userId: string) => async (dispatch: DispatchType) => {
    const res = await postsAPI.deleteComment(postId, commentId)
    if (res.data.resultCode === 2) {
        // @ts-ignore
        dispatch(getPosts(userId))
    }
}
export const toggleCommentLike = (postId: string, commentId: string, userId: string) => async (dispatch: DispatchType) => {
    const res = await postsAPI.toggleCommentLike(postId, commentId)
    if (res.data.resultCode === 2) {
        // @ts-ignore
        dispatch(getPosts(userId))
    }
}