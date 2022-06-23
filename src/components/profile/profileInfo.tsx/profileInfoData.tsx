
import { ProfileDataType } from "../../../ts/profile"
import s from "./profileInfo.module.css"

type PropsType = {
    profile: ProfileDataType | null
    ownerId: string | undefined
    setEditProfile: (isEdit: boolean) => void
    createDialog: (userId: string) => void
}

export const ProfileInfoData = (props: PropsType) => {
    
    const profile = props.profile
    
    const profileContacts = profile?.contacts
    const profileContactsKeys = profile ? Object.keys(profile.contacts) : null
    const contactsItems = profileContactsKeys?.map(p => {
        return <li key={p}>
        {/* @ts-ignore */}
            <span>{p}</span>: {profileContacts[p]}
        </li>
    })

    const onWriteMessage = () => {
        profile && props.createDialog(profile._id)
    }

    return <div className={s.profileInfoData}>

        {(props.ownerId && props.ownerId !== profile?._id)
            && <button onClick={onWriteMessage}>Надіслати приватне повідомлення</button>}
        <div>{profile?.fullName}</div>
        <div>{profile?.aboutMe || '-------------------'}</div>
        <div>Шукаю роботу: {profile?.lookingForAJob ? 'так' : 'ні'}</div>
        {profile?.lookingForAJob && <div>Описання майбутньої роботи: {profile?.lookingForAJobDescription}</div>}
        {(profile?.location.city || profile?.location.country)
            && <div>Місце проживання: {profile?.location.city} {profile?.location.country}</div>
        }
        <ul>Контакти: 
            {contactsItems}
        </ul>
        {(props.ownerId === profile?._id) && <button onClick={() => props.setEditProfile(true)}>Редагувати</button>}
    </div>
}