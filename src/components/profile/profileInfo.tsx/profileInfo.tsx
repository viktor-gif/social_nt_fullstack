import { useState } from "react"
import { ProfileDataType } from "../../../ts/profile"
import s from "./profileInfo.module.css"
import { ProfileInfoData } from "./profileInfoData"
import { ProfileInfoForm } from "./profileInfoForm"

type PropsType = {
    profile: ProfileDataType | null
    ownerId: string | undefined
    updateProfile: (data: ProfileDataType) => void
    getProfile: (userId: string) => void
    createDialog: (userId: string) => void
}

export const ProfileInfo = (props: PropsType) => {
    const [isEditProfile, setEditProfile] = useState(false)
    if (isEditProfile && props.profile?._id === props.ownerId) {
        return <div className={s.profileInfo}>
            <ProfileInfoForm profile={props.profile} setEditProfile={setEditProfile}
                updateProfile={props.updateProfile} getProfile={props.getProfile} />
    </div>
    }
    return <div className={s.profileInfo}>
        <ProfileInfoData profile={props.profile} ownerId={props.ownerId} setEditProfile={setEditProfile}
                createDialog={props.createDialog} />
    </div>
}