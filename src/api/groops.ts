import { axiosCreate } from "./api";

export const groopsAPI = {
    getGroops() {
        return axiosCreate.get(`/groops`)
    },
    createGroop(authorId: string, title: string, groopType: string = 'public') {
        return axiosCreate.post(`/groops?authorId=${authorId}&title=${title}&groopType=${groopType}`)
    },
    geleteGroop() {
        return axiosCreate.delete(`/groops`)
    }
}
