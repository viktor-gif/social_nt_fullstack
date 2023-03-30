import { NavLink } from "react-router-dom";
import { PersonAdd, PersonRemove } from "react-ionicons";
import { LocationType, PhotosType } from "../../../ts/users";
import avatar from "../../../img/ava_male.jpeg"
import s from "./user.module.css"
import { ProfileDataType } from "../../../ts/profile";
import { useEffect, useState } from "react";
import { followAPI } from "../../../api/follow";
import { AuthDataType } from "../../../ts/auth";

type PropsType = {
    id: string
    key: string
    fullName: string
    status: string | null
    photos: PhotosType
    location: LocationType
    followers: string[]
    authData: AuthDataType | null

    getUserProfile: (data: ProfileDataType) => void
}

export const User = (props: PropsType) => {
    const [userFollow_status, setUserFollow_status] = useState("")
    const getFollow = () => {
        followAPI.getFollow(props.id).then(res => {
            if (res.data != userFollow_status) setUserFollow_status(res.data)
        })
    }
    useEffect(() => {
        getFollow()
    }, [])

    let followButtonText = ""

    if (userFollow_status === "") {
        followButtonText = "Додати до друзів"
    } else if (userFollow_status === "pending-for-answer") {
        followButtonText = "Відмінити заявку"
    } else if (userFollow_status === "query-for-answer") {
        followButtonText = "Прийняти заявку"
    } else if (userFollow_status === "followed") {
        followButtonText = "Видалити з друзів"
    }

    const followClick = () => {
        if (userFollow_status === "" || userFollow_status === "query-for-answer") {
            followAPI.setFollow(props.id).then(() => getFollow()) 
            console.log(props.id)
        } else {
            followAPI.deleteFollow(props.id).then(() => getFollow()) 
            console.log(props.id)
        }
    }
    console.log(userFollow_status === "followed" || userFollow_status === "pending-for-answer")
    return <div className={s.user}>
        <div className={s.user__avatar}>
            <NavLink to={`/profile/${props.id}`}>
                <img className={s.user__pic} src={props.photos.small || avatar} />
            </NavLink>
        </div>
        <div className={s.user__dataBlock}>
            <div className={s.user__data}>
                <div className={s.user__id}><b>Id: </b>{props.id}</div>
                <div className={s.user__fullName}>{props.fullName}</div>
                <div className={s.user__location}><b>Проживає: </b>{props.location.city}, {props.location.country}</div>
            </div>
            {props.authData?.id !== props.id
                && <div className={s.followButton}
                    onClick={followClick}>
                    {(userFollow_status === "" || userFollow_status === "query-for-answer")
                        && <PersonAdd
                            color={"#777"}
                            width="20px"
                            height="20px"
                        />
                    }
                    {(userFollow_status === "followed" || userFollow_status === "pending-for-answer")
                        && <PersonRemove
                            color={"blue"}
                            width="20px"
                            height="20px"
                        />
                    }
                    <span className={s.followStatusText}>{followButtonText}</span>
                    </div>
            }
            
        </div>
        
    </div>

}