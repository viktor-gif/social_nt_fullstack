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
    },
    toggleLike: (postId: string) => {
        return axiosCreate.put(`/posts/${postId}/like`)
    },
    addComment: (postId: string, commentText: string) => {
        return axiosCreate.post(`/posts/${postId}/comments`, {commentText})
    },
    updateComment: (postId: string, commentId: string, commentText: string) => {
        return axiosCreate.put(`/posts/${postId}/comments/${commentId}/update`, {commentText})
    },
    deleteComment: (postId: string, commentId: string) => {
        return axiosCreate.delete(`/posts/${postId}/comments/${commentId}`)
    },
    toggleCommentLike: (postId: string, commentId: string) => {
        return axiosCreate.put(`/posts/${postId}/comments/${commentId}/like`)
    }
}
