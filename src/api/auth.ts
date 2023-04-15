import { axiosCreate } from "./api";

export const authAPI = {
    me() {
        return axiosCreate.get(`/auth/me`)
    },
    login(email: string, password: string) {
        return axiosCreate.post(`/auth/login?email=${email}&password=${password}`)
    },
    logout() {
        return axiosCreate.delete(`/auth/login`)
    }

    
}
