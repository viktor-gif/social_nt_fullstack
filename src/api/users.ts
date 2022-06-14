import axios from "axios";
import { axiosCreate } from "./api";

export const getUsers = (pageSize: number, pageNumber: number, term: string | null) => {
    return axiosCreate.get(`/users?pageSize=${pageSize}&pageNumber=${pageNumber}&term=${term}`)
}
export const createUser = (login: string, email: string, password: string, fullName: string) => {
    return axiosCreate.post(`/users/add?login=${login}&email=${email}&password=${password}&fullName=${fullName}`)
}