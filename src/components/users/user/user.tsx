import { LocationType, PhotosType } from "../../../ts/users";
import avatar from "../../../img/ava_male.jpeg"
import s from "./user.module.css"
import { getProfile } from "../../../api/profile";
import { profileDataType } from "../../../ts/profile";
import { useState } from "react";
import { Navigate } from "react-router";
import { NavLink } from "react-router-dom";

type PropsType = {
    id: string
    key: string
    fullName: string
    status: string | null
    photos: PhotosType
    location: LocationType
    getUserProfile: (data: profileDataType) => void
}

export const User = (props: PropsType) => {

    return <div className={s.user}>
        <div className={s.user__avatar}>
            <NavLink to={`/profile/${props.id}`}>
                <img className={s.user__pic} src={props.photos.small || avatar} />
            </NavLink>
        </div>
        <div className={s.user__status}>{props.status || '---------------'}</div>
        <div className={s.user__id}><b>Id: </b>{props.id}</div>
        <div className={s.user__fullName}>{props.fullName}</div>
        <div className={s.user__location}><b>Status: </b>{props.location.country} {props.location.city}</div>
    </div>

}