import { axiosCreate } from "./api";

export const groopsAPI = {
    getGroops() {
        return axiosCreate.get(`/groops`)
    },
    createGroop() {
        return axiosCreate.post(`/groops`)
    },
    geleteGroop() {
        return axiosCreate.delete(`/groops`)
    }
}
