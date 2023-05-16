import React, { useEffect, useState } from "react"
import { PostType } from "../../../ts/posts"
import { ProfileDataType } from "../../../ts/profile"
import { Post } from "./post/post"
import s from "./posts.module.css"
import { PostsForm } from "./postsForm/postsForm"

type PropsType = {
    posts: PostType[]
    profileData: ProfileDataType | null
    authProfileData: ProfileDataType | null

    getPosts: (userId: string) => void
    addPost: (userId: string, postText: string, file: any) => void
    deletePost: (postId: string, userId: string) => void
    updatePost: (postId: string, postText: string, file: any, userId: string) => void
    toggleLike: (postId: string, userId: string) => void
    addComment: (postId: string, userId: string, commentText: string, file: any, linkToAnotherComment: string | null) => void
    deleteComment: (postId: string, commentId: string, userId: string) => void
    updateComment: (postId: string, commentId: string, commentText: string, file: any, userId: string) => void
    toggleCommentLike: (postId: string, commentId: string, userId: string) => void
}

export const Posts = React.memo((props: PropsType) => {
  const [commentFile, setCommentFile] = useState(null)
  const [postFile, setPostFile] = useState(null)
    useEffect(() => {
        props.profileData && props.getPosts(props.profileData.userId)
    }, [props.profileData])
  
    const postsElements = [...props.posts].reverse().map(p => {
        return <Post key={p.postId} postId={p.postId} postText={p.postText} authorId={p.authorId}
            comments={p.comments} created={p.created} userId={p.profileId}
          authProfileData={props.authProfileData} likesCount={p.likesCount}
          deletePost={props.deletePost} updatePost={props.updatePost}
          toggleLike={props.toggleLike} liked={p.likedUsers.includes(props.authProfileData?.userId || '')}
          addComment={props.addComment} deleteComment={props.deleteComment}
          updateComment={props.updateComment} toggleCommentLike={props.toggleCommentLike}
          postImg={p.postImg} postVideo={p.postVideo} postAudio={p.postAudio}
          commentFile={commentFile} setCommentFile={setCommentFile}
          postFile={postFile} setPostFile={setPostFile} />
    })
  return <div className={s.posts}>
    <PostsForm profileData={props.profileData}
      authProfileData={props.authProfileData} addPost={props.addPost}
      postFile={postFile} setPostFile={setPostFile} />
    {postsElements}
  </div>
})