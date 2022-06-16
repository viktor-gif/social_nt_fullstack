import { LocationType, PhotosType } from "./users"

export type ContactsType = {
    github: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    linkedin: string | null
}

export type ProfileDataType = {
    photos: PhotosType
    location: LocationType
    contacts: ContactsType
    _id: string
    fullname: string
    status: string | null
    aboutMe: string | null
    lookingForAjob: boolean
    lookingForAJobDescription: string | null
    created: string
}