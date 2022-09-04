import { axiosCreate } from "./api";

export const postsAPI = {
    getPosts: (userId: string) => {
        return axiosCreate.get(`/posts?userId=${userId}`)
    },

    createPost: (userId: string, postText: string, file: any) => {
        const fileData = new FormData()
        fileData.append("posts", file)
        return axiosCreate.post(`/posts?userId=${userId}&postText=${postText}&whereIsFile=posts`, fileData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    
    deletePost: (postId: string) => {
        return axiosCreate.delete(`/posts/${postId}`)
    },

    updatePost: (postId: string, postText: string, file: any) => {
        const fileData = new FormData()
        fileData.append("posts", file)
        return axiosCreate.put(`/posts/${postId}?postText=${postText}&whereIsFile=posts`, fileData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },

    toggleLike: (postId: string) => {
        return axiosCreate.put(`/posts/${postId}/like`)
    },

    addComment: (postId: string, commentText: string, file: any, linkToAnotherComment: string | null = null) => {
        
        const fileData = new FormData()
        fileData.append("comments", file)
        return axiosCreate.post(`/posts/${postId}/comments?commentText=${commentText}&linkToAnotherComment=${linkToAnotherComment}&whereIsFile=comments`, fileData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },

    updateComment: (postId: string, commentId: string, commentText: string, file: any) => {
       
        const fileData = new FormData()
        fileData.append("comments", file)
        return axiosCreate.put(`/posts/${postId}/comments/${commentId}/update?commentText=${commentText}&whereIsFile=comments`, fileData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },

    deleteComment: (postId: string, commentId: string) => {
        return axiosCreate.delete(`/posts/${postId}/comments/${commentId}`)
    },
    toggleCommentLike: (postId: string, commentId: string) => {
        return axiosCreate.put(`/posts/${postId}/comments/${commentId}/like`)
    }
}
