import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { AppStateType } from "../../redux/redux-store"
import { getProfile, getStatus, updateStatus, updatePhoto, updateProfile } from "../../redux/profileReducer"
import { createDialog } from "../../redux/dialogsReducer"
import { ProfileDataType } from "../../ts/profile"
import avatar from "../../img/ava_male.jpeg"
import s from "./profile.module.css"
import { useParams, Navigate } from "react-router-dom"
import { ProfileInfo } from "./profileInfo.tsx/profileInfo"
import { ConnectionPoolClearedEvent } from "mongodb"

type PropsType = {
    ownerId: string | undefined
    profileData: ProfileDataType | null
    status: string | null
    isAuth: boolean

    getProfile: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void
    updatePhoto: (photoFile: any) => void
    updateProfile: (data: ProfileDataType) => void
    createDialog: (userId: string) => void
}

const Profile = (props: PropsType) => {
    const [isEditStatus, setEditStatus] = useState(false)
    const [profileStatus, setProfileStatus] = useState(props.status)
    console.log(props.status);
    
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
            props.updatePhoto(e.target.files[0])
        } 
    }

    return <div className={s.profile}>
        <div>
            <img className={s.profile__pic} src={profile?.photos.large || avatar} alt="User-avatar" />
            {(props.ownerId === profile?._id) && <input type="file" onChange={onUpdatePhoto} />}
        </div>
        
        <div>
            {isEditStatus ?
                <input onBlur={saveNewStatus} onChange={changeStatus} type="text" placeholder="Ваш новий статус" value={profileStatus || ''} />
                :
                <span onDoubleClick={() => setEditStatus(true)}>{props.status || '-------------------'}</span>
            }
        </div>
        <div></div>
        <ProfileInfo profile={profile} ownerId={props.ownerId}
            updateProfile={props.updateProfile} getProfile={props.getProfile}
        createDialog={props.createDialog} />
    </div>
}

const mapStateToProps = (state: AppStateType) => ({
    ownerId: state.auth.ownerData?.id,
    profileData: state.profilePage.profileData,
    status: state.profilePage.status,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {
    getProfile,
    getStatus,
    updateStatus,
    updatePhoto,
    updateProfile,
    createDialog
})(Profile)