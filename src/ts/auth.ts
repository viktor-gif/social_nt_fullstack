import { ProfileDataType } from "./profile"

export type AuthDataType = {
    id: string
    login: string
    email: string
    otherData: ProfileDataType | null
}
