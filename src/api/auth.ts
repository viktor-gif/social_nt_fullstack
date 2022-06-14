import { axiosCreate } from "./api";

export const me = () => {
    return axiosCreate.get(`/auth/me`)
}
export const login = (login: string, email: string, password: string) => {
    return axiosCreate.post(`/auth/login?login=${login}&email=${email}&password=${password}`)
}
export const logout = () => {
    return axiosCreate.delete(`/auth/login`)
}