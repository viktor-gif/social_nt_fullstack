import { axiosCreate } from "./api";

export const usersAPI = {
    getUsers(pageSize: number, pageNumber: number, term: string | null, friendStatus: string = "followed") {
        return axiosCreate.get(`/users?pageSize=${pageSize}&pageNumber=${pageNumber}&term=${term}&friendStatus=${friendStatus}`)
    },
    createUser(login: string, email: string, password: string, fullName: string) {
        return axiosCreate.post(`/users/add?login=${login}&email=${email}&password=${password}&fullName=${fullName}`)
    },
    test() {
        return axiosCreate.get('users/test')
    }

}
