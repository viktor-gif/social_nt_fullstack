import { LocationType, PhotosType } from "../../../ts/users";
import avatar from "../../../img/ava_male.jpeg"
import s from "./user.module.css"
import { ProfileDataType } from "../../../ts/profile";
import { NavLink } from "react-router-dom";
import { Button } from "../../common/button/Button";
import { useEffect, useState } from "react";
import { followAPI } from "../../../api/follow";

type PropsType = {
    id: string
    key: string
    fullName: string
    status: string | null
    photos: PhotosType
    location: LocationType
    followers: string[]

    getUserProfile: (data: ProfileDataType) => void
}

export const User = (props: PropsType) => {
    const [userFollow_status, setUserFollow_status] = useState("")
    const getFollow = () => {
        followAPI.getFollow(props.id).then(res => {
            if(res.data != userFollow_status) setUserFollow_status(res.data)
            console.log(res.data)
        })
    }
    useEffect(() => {
        getFollow()
    }, [])

    let followButtonText = ""

    if (userFollow_status === "") {
        followButtonText = "Подати заявку в друзі"
    } else if (userFollow_status === "pending-for-answer") {
        followButtonText = "Відмінити заявку в друзі"
    } else if (userFollow_status === "query-for-answer") {
        followButtonText = "Прийняти заявку в друзі"
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

    return <div className={s.user}>
        <div className={s.user__avatar}>
            <NavLink to={`/profile/${props.id}`}>
                <img className={s.user__pic} src={props.photos.small || avatar} />
            </NavLink>
        </div>
        <Button value={followButtonText}
            onClick={followClick} />
        <div className={s.user__status}>{props.status || '---------------'}</div>
        <div className={s.user__id}><b>Id: </b>{props.id}</div>
        <div className={s.user__fullName}>{props.fullName}</div>
        <div className={s.user__location}><b>Status: </b>{props.location.country} {props.location.city}</div>
    </div>

}