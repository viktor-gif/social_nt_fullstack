
import { axiosCreate } from "./api";

export const videoAPI = {
    getVideo() {
        return axiosCreate.get(`/video`)
    },
    addVideo(title: string | null, isPrivat: boolean = false, file: any) {
        debugger
        const videoData = new FormData()
        videoData.append('video', file)
        return axiosCreate.post(`/video?title=${title}&isPrivat=${isPrivat}`, videoData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }
}
