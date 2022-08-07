import { Formik, Form, Field } from "formik"
import React, { useEffect, useState } from "react"
import { PostType } from "../../../ts/posts"
import { ProfileDataType } from "../../../ts/profile"
import { Post } from "./post/post"
import s from "./posts.module.css"

type PropsType = {
    posts: PostType[]
    profileData: ProfileDataType | null
    authProfileData: ProfileDataType | null

    getPosts: (userId: string) => void
    addPost: (userId: string, postText: string) => void
    deletePost: (postId: string, userId: string) => void
    updatePost: (postId: string, postText: string, userId: string) => void
    toggleLike: (postId: string, userId: string) => void
    addComment: (postId: string, commentText: string, userId: string) => void
    deleteComment: (postId: string, commentId: string, userId: string) => void
    updateComment: (postId: string, commentId: string, commentText: string, userId: string) => void
    toggleCommentLike: (postId: string, commentId: string, userId: string) => void
}

export const Posts = React.memo((props: PropsType) => {

    const [currentPostText, setCurrentPostText] = useState('')

    useEffect(() => {
        props.profileData && props.getPosts(props.profileData._id)
    }, [props.profileData])
    const postsElements = props.posts.map(p => {
        return <Post key={p._id} postId={p._id} postText={p.postText} authorId={p.authorId}
            comments={p.comments} created={p.created} userId={p.profileId}
          authProfileData={props.authProfileData} likesCount={p.likesCount}
          deletePost={props.deletePost} updatePost={props.updatePost}
          toggleLike={props.toggleLike} liked={p.likedUsers.includes(props.authProfileData?._id || '')}
          addComment={props.addComment} deleteComment={props.deleteComment}
          updateComment={props.updateComment} toggleCommentLike={props.toggleCommentLike} />
    })
    return <div className={s.posts}>
        {postsElements}
        <Formik
            initialValues={{ postText: currentPostText }}
            onSubmit={(val) => {
                // @ts-ignore
                props.addPost(props.profileData?._id, currentPostText)
                setCurrentPostText('')
            }}
     >
       {({ isSubmitting }) => (
         <Form>
           <Field type="text" name="postText" component="textarea" value={currentPostText} onChange={(e: any) => setCurrentPostText(e.target.value)} />
          <div>
            <button type="submit">
              Створити новий пост
            </button>
          </div>
         </Form>
       )}
     </Formik>
    </div>
})