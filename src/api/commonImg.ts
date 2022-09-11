
import { axiosCreate } from "./api";

export const imgAPI = {
    getImg(imgType: string, term: string | null) {
       
        return axiosCreate.get(`/img?imgType=${imgType}&term=${term}`)
    },
    addImg(title: string | null, isPrivat: boolean = false, file: any) {
        const imgData = new FormData()
        imgData.append('img', file)
        return axiosCreate.post(`/img?title=${title}&isPrivat=${isPrivat}`, imgData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    addCommonImg(imgId: string) {
        return axiosCreate.put(`/img/${imgId}/add`)
    }
}
