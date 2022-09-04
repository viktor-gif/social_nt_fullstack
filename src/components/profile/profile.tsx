import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { AppStateType } from "../../redux/redux-store"
import {
    getProfile, getStatus, updateStatus, updatePhoto, updateProfile,
    getPosts, addPost, deletePost, updatePost, toggleLike,
    addComment, deleteComment, updateComment, toggleCommentLike
} from "../../redux/profileReducer"
import { createDialog } from "../../redux/dialogsReducer"
import { ProfileDataType } from "../../ts/profile"
import avatar from "../../img/ava_male.jpeg"
import s from "./profile.module.css"
import { useParams, Navigate } from "react-router-dom"
import { ProfileInfo } from "./profileInfo.tsx/profileInfo"
import { PostType } from "../../ts/posts"
import { Posts } from "./posts/posts"

type PropsType = {
    ownerId: string | undefined
    profileData: ProfileDataType | null
    status: string | null
    isAuth: boolean
    posts: PostType[]
    authProfileData: ProfileDataType | null

    getPosts: (userId: string) => void
    getProfile: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void

    updatePhoto: (photoFile: any, userId: string) => void

    updateProfile: (data: ProfileDataType) => void
    createDialog: (userId: string) => void
    addPost: (userId: string, postText: string, file: any) => void
    deletePost: (postId: string, userId: string) => void
    updatePost: (postId: string, postText: string, file: any, userId: string) => void
    toggleLike: (postId: string, userId: string) => void
    addComment: (postId: string, userId: string, commentText: string, file: any, linkToAnotherComment: string | null) => void
    deleteComment: (postId: string, commentId: string, userId: string) => void
    updateComment: (postId: string, commentId: string, commentText: string, file: any, userId: string) => void
    toggleCommentLike: (postId: string, commentId: string, userId: string) => void
}

const Profile = (props: PropsType) => {
    const [isEditStatus, setEditStatus] = useState(false)
    const [profileStatus, setProfileStatus] = useState(props.status)
    const [isPostsActive, setPostsActive] = useState(true)
    
    const profile = props.profileData

    let params = useParams()
    
    let userId = params.userId

    useEffect(() => {
        if (userId) {
            props.getProfile(userId)
            props.getStatus(userId)
            props.status && setProfileStatus(props.status) // this set props.status immidiately arter restart whith props.status in array-dependency
        }
    }, [userId, props.status])

    const saveNewStatus = () => {
        if (profileStatus && userId) {
            props.updateStatus(profileStatus)
            props.getStatus(userId)
        }
        setEditStatus(false)
    }
    const changeStatus = (e: any) => {
        setProfileStatus(e.target.value)
    }
    
    if (!props.isAuth) {
        return <Navigate replace to={'/login'} />
    } 
        
    
    const profileContacts = profile?.contacts
    const profileContactsKeys = profile ? Object.keys(profile.contacts) : null
    const contactsItems = profileContactsKeys?.map(p => {
        return <li key={p}>
        {/* @ts-ignore */}
            <span>{p}</span>: {profileContacts[p]}
        </li>
    })

    const onUpdatePhoto = (e: any) => {
        if (e.target.files.length && userId) {
            console.log(e.target.files)
            props.updatePhoto(e.target.files[0], userId)
        } 
    }
console.log(props.profileData)
    return <div className={s.profile}>
        <div className={s.profile__aside}>
            <div className={s.profile__avatar}>
            <img className={s.profile__pic} src={profile?.photos.large || avatar} alt="User-avatar" />
            {(props.ownerId === profile?._id)
                && <div className={s.profile__fileInput}>
                    <label htmlFor="photoChange">Змінити фото</label>
                    <input id="photoChange" type="file" onChange={onUpdatePhoto} />
                </div>}
            </div>
        </div>
        

        <div className={s.profile__infoBlock}>
            <div className={s.userStatus}>
                {isEditStatus ?
                    <input onBlur={saveNewStatus} onChange={changeStatus} type="text" placeholder="Ваш новий статус" value={profileStatus || ''} />
                    :
                    <span onDoubleClick={() => setEditStatus(true)}>{props.status || '-------------------'}</span>
                }
            </div>
            <ProfileInfo profile={profile} ownerId={props.ownerId}
                updateProfile={props.updateProfile} getProfile={props.getProfile}
                createDialog={props.createDialog} setPostsActive={setPostsActive} />
            {isPostsActive
                && <Posts posts={props.posts} getPosts={props.getPosts} profileData={props.profileData}
                    addPost={props.addPost} authProfileData={props.authProfileData}
                    deletePost={props.deletePost} updatePost={props.updatePost}
                    toggleLike={props.toggleLike} addComment={props.addComment}
                    deleteComment={props.deleteComment} updateComment={props.updateComment}
                toggleCommentLike={props.toggleCommentLike} />
            }
        </div>
    </div>
}

const mapStateToProps = (state: AppStateType) => ({
    ownerId: state.auth.authData?.id,
    profileData: state.profilePage.profileData,
    status: state.profilePage.status,
    isAuth: state.auth.isAuth,
    posts: state.profilePage.posts,
    authProfileData: state.auth.authProfileData
})

export default connect(mapStateToProps, {
    getProfile,
    getStatus,
    updateStatus,
    updatePhoto,
    updateProfile,
    createDialog,
    getPosts,
    addPost,
    deletePost,
    updatePost,
    toggleLike,
    addComment,
    deleteComment,
    updateComment,
    toggleCommentLike
})(Profile)