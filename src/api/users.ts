import { axiosCreate } from "./api";

export const usersAPI = {
    getUsers(pageSize: number, pageNumber: number, term: string | null, friendStatus: string = "followed") {
        return axiosCreate.get(`/users?pageSize=${pageSize}&pageNumber=${pageNumber}&term=${term}&friendStatus=${friendStatus}`)
    },
    createUser(email: string, password: string, fullName: string) {
        return axiosCreate.post(`/users/add?email=${email}&password=${password}&fullName=${fullName}`)
    },
    test() {
        return axiosCreate.get('users/test')
    }

}
