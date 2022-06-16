import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { profileAPI } from "../../api/profile"
import { appStateType } from "../../redux/redux-store"
import {profileActions} from "../../redux/profileReducer"
import { profileDataType } from "../../ts/profile"
import avatar from "../../img/ava_male.jpeg"
import s from "./profile.module.css"
import { useParams, Navigate } from "react-router-dom"

type PropsType = {
    ownerId: string | undefined
    profileData: profileDataType | null
    getUserProfile: (data: profileDataType) => void
}

const Profile = (props: PropsType) => {
    const profile = props.profileData

    let params = useParams()
    console.log(params)
    
    let userId = params.userId
    console.log(typeof userId);

    useEffect(() => {
        userId && profileAPI.getProfile(userId)
            .then(res => props.getUserProfile(res.data))
    }, [userId])
    
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
        <div>{profile?.status || '-------------------'}</div>
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

const mapStateToProps = (state: appStateType) => ({
    ownerId: state.auth.ownerData?.id,
    profileData: state.profilePage.profileData
})

export default connect(mapStateToProps, {
    getUserProfile: profileActions.setProfileData
})(Profile)