import { axiosCreate } from "./api";

export const groopsAPI = {
    getGroops() {
        return axiosCreate.get(`/groops`)
    },
    getGroopInfo(groopId: string) {
        return axiosCreate.get(`/groops/${groopId}`)
    },
    createGroop(authorId: string, title: string, groopType: string = 'public') {
        return axiosCreate.post(`/groops?authorId=${authorId}&title=${title}&groopType=${groopType}`)
    },
    geleteGroop() {
        return axiosCreate.delete(`/groops`)
    },
    addFollower(groopId: string) {
        return axiosCreate.post(`/groops/${groopId}/addFollower`)
    },
    deleteFollower(groopId: string) {
        return axiosCreate.delete(`/groops/${groopId}/deleteFollower`)
    }
}
