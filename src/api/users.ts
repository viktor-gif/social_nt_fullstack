import axios from "axios";
import { axiosCreate } from "./api";

export const getUsers = (pageSize: number, pageNumber: number, term: string | null) => {
    return axiosCreate.get(`/users?pageSize=${pageSize}&pageNumber=${pageNumber}&term=${term}`)
}