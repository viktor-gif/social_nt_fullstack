import { axiosCreate } from "./api";

export const postsAPI = {
    getPosts: (userId: string) => {
        return axiosCreate.get(`/posts?userId=${userId}`)
    },
    createPost: (userId: string, postText: string) => {
        return axiosCreate.post(`/posts?userId=${userId}`, {postText})
    },
    deletePost: (postId: string) => {
        return axiosCreate.delete(`/posts/${postId}`)
    },
    updatePost: (postId: string, postText: string) => {
        return axiosCreate.put(`/posts/${postId}`, {postText})
    }
}
