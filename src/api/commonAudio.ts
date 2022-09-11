
import { axiosCreate } from "./api";

export const audioAPI = {
    getAudio(audioType: string, term: string | null) {
       
        return axiosCreate.get(`/audio?audioType=${audioType}&term=${term}`)
    },
    addAudio(title: string | null, isPrivat: boolean = false, file: any) {
        const audioData = new FormData()
        audioData.append('audio', file)
        return axiosCreate.post(`/audio?title=${title}&isPrivat=${isPrivat}`, audioData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    addCommonAudio(audioId: string) {
        return axiosCreate.put(`/audio/${audioId}/add`)
    }
}
