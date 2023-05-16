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
const SET_PROFILE_ERROR = 'Viktor-gif/profile/SET_PROFILE_ERROR'

type InitialStateType = typeof initialState

const initialState = {
    profileData: null as ProfileDataType | null,
    status: null as string | null,
    posts: [] as PostType[],
    profileError: null as string | null
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
        case SET_PROFILE_ERROR:
            
            return {
                ...state,
                profileError: action.payload
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
    setProfileError: (err: string | null) => ({ type: SET_PROFILE_ERROR, payload: err } as const)
}

// redux-thunk
type DispatchType = Dispatch<actionsTypes>
export const getStatus = (userId: string) => async (dispatch: DispatchType) => {
    try {
        const res = await profileAPI.getStatus(userId)
        const data = res.data?.userStatus
        if (data) {
            dispatch(profileActions.setStatus(data.status))
        }
    } catch (err: any) {
        if (err.response.status === 401) {
            dispatch(profileActions.setProfileError(err.response.data.message || 'Ввійдіть, будь ласка, в аккаунт'))
        } else if (err.response.status === 404) {
            dispatch(profileActions.setProfileError(err.response.data.message || 'Такий користувач відсутній'))
        } else {
            dispatch(profileActions.setProfileError('Помилка сервера'))
        }
    }
}
export const updateStatus = (status: string | null) => async (dispatch: DispatchType) => {
    try {
        const res = await profileAPI.updateStatus(status)
        if (res.data.resultCode === 0) {
            console.log('cool updated status')
            dispatch(profileActions.setProfileError(null))
        }
    } catch (err: any) {
        if (err.response.status === 401) {
            dispatch(profileActions.setProfileError(err.response.data.message || 'Ввійдіть, будь ласка, в аккаунт'))
        } else if (err.response.status === 403) {
            dispatch(profileActions.setProfileError(err.response.data.message || 'Текст статусу відсутній'))
        } else {
            dispatch(profileActions.setProfileError('Помилка сервера'))
        }
    }
}
export const getProfile = (userId: string) => async (dispatch: DispatchType) => {
    try {
        const res = await profileAPI.getProfile(userId)
        const data = res.data?.data
        if (data) {
            dispatch(profileActions.setProfileData(data))
        }
    } catch (err: any) {
        if (err.response.status === 401) {
            dispatch(profileActions.setProfileError(err.response.data.message || 'Ввійдіть, будь ласка, в аккаунт'))
        } else if (err.response.status === 404) {
            dispatch(profileActions.setProfileError(err.response.data.message || 'Такий користувач відсутній'))
        } else {
            dispatch(profileActions.setProfileError('Помилка сервера'))
        }
    }
}
export const updatePhoto = (photoFile: any, userId: string) => async (dispatch: DispatchType) => {
    try {
        const res = await profileAPI.updateAvatar(photoFile)
        if (res.data.resultCode === 0) {
            // @ts-ignore
            dispatch(getProfile(userId))
            dispatch(profileActions.setProfileError(null))
        }
    } catch (err: any) {
        if (err.response.status === 401) {
            dispatch(profileActions.setProfileError(err.response.data.message || 'Ввійдіть, будь ласка, в аккаунт'))
        } else if (err.response.status === 403) {
            dispatch(profileActions.setProfileError(err.response.data.message || 'Фото відсутнє'))
        } else {
            dispatch(profileActions.setProfileError('Помилка сервера'))
        }
    }
}
export const updateProfile = (data: ProfileDataType) => async (dispatch: DispatchType) => {
    try {
        const res = await profileAPI.updateProfile(data)
        if (res.data.resultCode === 0) {
            console.log('cool updated profile')
            dispatch(profileActions.setProfileError(null))
        }
    } catch (err: any) {
        if (err.response.status === 401) {
            dispatch(profileActions.setProfileError(err.response.data.message || 'Ввійдіть, будь ласка, в аккаунт'))
        } else if (err.response.status === 403) {
            dispatch(profileActions.setProfileError(err.response.data.message || 'Текст статусу відсутній'))
        } else {
            dispatch(profileActions.setProfileError('Помилка сервера'))
        }
    }
}
export const getPosts = (userId: string) => async (dispatch: DispatchType) => {
    try {
        const res = await postsAPI.getPosts(userId)
        const data = res.data
        if (data) {
            dispatch(profileActions.setPosts(data.items))
        }
    } catch (err: any) {
        console.log('error__-_---___--__')
        console.log(err)
        if (err.response.status === 401) {
            dispatch(profileActions.setProfileError(err.response.data.message || 'Ввійдіть, будь ласка, в аккаунт'))
        } else if (err.response.status === 404) {
            dispatch(profileActions.setProfileError(err.response.data.message || 'Пости відсутні'))
        } else {
            dispatch(profileActions.setProfileError('Помилка сервера'))
        }
    }
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
    try {
        const res = await postsAPI.addComment(postId, commentText, file, linkToAnotherComment)
        if (res.data.resultCode === 0) {
            // @ts-ignore
            dispatch(getPosts(userId))
        }
    } catch (err: any) {
        if (err.response.status === 401) {
            dispatch(profileActions.setProfileError(err.response.data.message || 'Ввійдіть, будь ласка, в аккаунт'))
        } else if (err.response.status === 404) {
            dispatch(profileActions.setProfileError(err.response.data.message || 'Такого поста не існує'))
        } else if (err.response.status === 400) {
            dispatch(profileActions.setProfileError(err.response.data.message || 'Даних для створення поста недостатньо'))
        } else {
            dispatch(profileActions.setProfileError('Помилка сервера'))
        }
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