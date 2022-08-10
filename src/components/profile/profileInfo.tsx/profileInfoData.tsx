
import { useState } from "react"
import { Navigate } from "react-router-dom"
import { ProfileDataType } from "../../../ts/profile"
import { Button } from "../../common/button/Button"
import s from "./profileInfo.module.css"

type PropsType = {
    profile: ProfileDataType | null
    ownerId: string | undefined
    setEditProfile: (isEdit: boolean) => void
    createDialog: (userId: string) => void
    setPostsActive: (isActive: boolean) => void
}

export const ProfileInfoData = (props: PropsType) => {
    const [isWriteMessage, setWriteMessage] = useState(false)
    const [isAllInfo, setAllInfo] = useState(false)
    
    const profile = props.profile
    
    const profileContacts = profile?.contacts
    const profileContactsKeys = profile ? Object.keys(profile.contacts) : null
    const contactsItems = profileContactsKeys?.map(p => {
        return <li className={s.profileData__item} key={p}>
            <span className={s.profileData__name}>{p}:</span>
        {/* @ts-ignore */}
            <span className={s.profileData__text}>{profileContacts[p]}</span>
        </li>
    })

    const onWriteMessage = () => {
        profile && props.createDialog(profile._id)
        setWriteMessage(true)
    }

    if (isWriteMessage) return <Navigate replace to="/dialogs" />

    const toggleAllInfo = () => {
        if (isAllInfo) {
            setAllInfo(false)
        } else {
            setAllInfo(true)
        }
    }

    return <div className={s.profileInfoData}>

        <div className={s.fullname}>{profile?.fullName}</div>

        {(props.ownerId && props.ownerId !== profile?._id)
            // && <button onClick={onWriteMessage}>Надіслати повідомлення</button>
            && <div className={s.buttonSendMessage}>
                <Button onClick={onWriteMessage} value="Надіслати повідомлення" size="seven" />
            </div>
        }
        
        {(profile?.location.city || profile?.location.country)
            && <div className={s.profileData__item}>
                <span className={s.profileData__name}>Місце проживання:</span>
                <span className={s.profileData__text}>
                    {profile?.location.city}, {profile?.location.country}
                </span>
            </div>
        }
        
        <div className={s.profileData__item}>
            <span className={s.profileData__name}>Шукаю роботу:</span>
            <span className={s.profileData__text}>
                {profile?.lookingForAJob ? 'так' : 'ні'}
            </span>
        </div>

        {profile?.lookingForAJob
            && <div className={s.profileData__item}>
                <span className={s.profileData__name}>Про майбутню роботу:</span>
                <span className={s.profileData__text}>
                    {profile?.lookingForAJobDescription}
                </span>
            </div>
        }

        {(profile?.aboutMe && profile.aboutMe.length > 0)
            && <div className={s.profileData__item}>
                <span className={s.profileData__name}>Про мене:</span>
                <span className={s.profileData__text}>
                    {profile?.aboutMe}
                </span>
            </div>
        }

        <div className={s.toggleInfo}>
            <span onClick={toggleAllInfo}>{isAllInfo ? "Приховати" : "Показати"} повну інформацію</span>
        </div>

        <div className={!isAllInfo ? s.profileData__toggle : ""}>
            <ul className={s.profileData__item + " " + s.profileData__contacts}>
                <span className={s.profileData__name + " " + s.profileData__contactHead}>Контакти:</span> 
                {contactsItems}
            </ul>
        </div>
        
        {(props.ownerId === profile?._id)
            && <Button value="Редагувати" onClick={() => {
            props.setEditProfile(true)
            props.setPostsActive(false)
            }
            } />
        }
    </div>
}