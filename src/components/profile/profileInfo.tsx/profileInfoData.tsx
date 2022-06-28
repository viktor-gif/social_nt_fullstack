
import { useState } from "react"
import { Navigate } from "react-router-dom"
import { ProfileDataType } from "../../../ts/profile"
import s from "./profileInfo.module.css"

type PropsType = {
    profile: ProfileDataType | null
    ownerId: string | undefined
    setEditProfile: (isEdit: boolean) => void
    createDialog: (userId: string) => void
}

export const ProfileInfoData = (props: PropsType) => {
    const [isWriteMessage, setWriteMessage] = useState(false)
    
    const profile = props.profile
    
    const profileContacts = profile?.contacts
    const profileContactsKeys = profile ? Object.keys(profile.contacts) : null
    const contactsItems = profileContactsKeys?.map(p => {
        return <li key={p}>
        {/* @ts-ignore */}
            <b>{p}</b>: <i>{profileContacts[p]}</i>
        </li>
    })

    const onWriteMessage = () => {
        profile && props.createDialog(profile._id)
        setWriteMessage(true)
    }

    if (isWriteMessage) return <Navigate replace to="/dialogs" />

    return <div className={s.profileInfoData}>

        {(props.ownerId && props.ownerId !== profile?._id)
            && <button onClick={onWriteMessage}>Надіслати приватне повідомлення</button>}
        <div>{profile?.fullName}</div>
        <div>{profile?.aboutMe || '-------------------'}</div>
        <div><b>Шукаю роботу</b>: {profile?.lookingForAJob ? 'так' : 'ні'}</div>
        {profile?.lookingForAJob && <div><b>Описання майбутньої роботи</b>: {profile?.lookingForAJobDescription}</div>}
        {(profile?.location.city || profile?.location.country)
            && <div><b>Місце проживання</b>: {profile?.location.city}, {profile?.location.country}</div>
        }
        <ul><b>Контакти</b>: 
            {contactsItems}
        </ul>
        {(props.ownerId === profile?._id) && <button onClick={() => props.setEditProfile(true)}>Редагувати</button>}
    </div>
}