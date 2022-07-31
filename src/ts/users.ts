export type PhotosType = {
    large: string | null,
    small: string | null
}

export type LocationType = {
    country: string | null,
    city: string | null
}

export type UserType = {
    id: string,
    fullName: string,
    status: string | null,
    location: LocationType,
    photos: PhotosType,
    followers: string[]
}