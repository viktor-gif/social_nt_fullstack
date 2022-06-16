import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { AppStateType } from "../../redux/redux-store"
import {getProfile, getStatus, updateStatus} from "../../redux/profileReducer"
import { ProfileDataType } from "../../ts/profile"
import avatar from "../../img/ava_male.jpeg"
import s from "./profile.module.css"
import { useParams, Navigate } from "react-router-dom"

type PropsType = {
    ownerId: string | undefined
    profileData: ProfileDataType | null
    status: string | null

    getProfile: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void
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
    
    if (userId === 'undefined') {
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

    return <div className={s.profile}>
        <div>
            <img className={s.profile__pic} src={profile?.photos.large || avatar} alt="User-avatar" />
        </div>
        
        <div>
            {isEditStatus ?
                <input onBlur={saveNewStatus} onChange={changeStatus} type="text" placeholder="Ваш новий статус" value={profileStatus || ''} />
                :
                <span onDoubleClick={() => setEditStatus(true)}>{props.status || '-------------------'}</span>
            }
        </div>
        <div></div>

        <div>{profile?.fullname}</div>
        <div>{profile?.aboutMe || '-------------------'}</div>
        <div>Шукаю роботу: {profile?.lookingForAjob ? 'так' : 'ні'}</div>
        {profile?.lookingForAjob && <div>Описання майбутньої роботи: {profile?.lookingForAJobDescription}</div>}
        {(profile?.location.city || profile?.location.country)
            && <div>Місце проживання: {profile?.location.city} {profile?.location.country}</div>
        }
        <ul>Контакти: 
            {contactsItems}
        </ul>
    </div>
}

const mapStateToProps = (state: AppStateType) => ({
    ownerId: state.auth.ownerData?.id,
    profileData: state.profilePage.profileData,
    status: state.profilePage.status
})

export default connect(mapStateToProps, {
    getProfile,
    getStatus,
    updateStatus
})(Profile)