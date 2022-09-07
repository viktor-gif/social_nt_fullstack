
import { axiosCreate } from "./api";

export const videoAPI = {
    getVideo(videoType: string, term: string | null) {
       
        return axiosCreate.get(`/video?videoType=${videoType}&term=${term}`)
    },
    addVideo(title: string | null, isPrivat: boolean = false, file: any) {
        const videoData = new FormData()
        videoData.append('video', file)
        return axiosCreate.post(`/video?title=${title}&isPrivat=${isPrivat}`, videoData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    addCommonVideo(videoId: string) {
        return axiosCreate.put(`/video/${videoId}/add`)
    }
}
