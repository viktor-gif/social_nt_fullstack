
import { useState } from 'react'
import { Attach } from 'react-ionicons'
import { PostType } from '../../../ts/posts'
import { ProfileDataType } from '../../../ts/profile'
import { GroopInfo__post } from './groopInfo__post'
import s from './groopInfo__posts.module.css'

type PropsType = {
    groopId: string | undefined
    groopPosts: PostType[] | undefined
    authProfileData: ProfileDataType | null

    addPost: (groopId: string, postText: string) => void
    getGroopInfo: (groopId: string) => void
    deletePost: (groopId: string, postId: string) => void
}

export const GroopInfo__posts = (props: PropsType) => {

    const [postInputValue, setPostInputValue] = useState('')

    const groopsItems = props.groopPosts?.map(g => <GroopInfo__post key={g.postId} postText={g.postText}
        postId={g.postId} created={g.created} comments={g.comments}
        authorId={g.authorId} likedUsers={g.likedUsers}
        getGroopInfo={props.getGroopInfo} groopId={props.groopId}
        deletePost={props.deletePost} />)

    return <div>
        <div className={s.posts__form}>
            <div className={s.posts__form_inputBlock}>
                {
                    props.authProfileData && 
                    <img src={props.authProfileData.photos.small || ''} alt="" />
                }
                <input type="text" placeholder='Напишіть що-небудь...'
                    value={postInputValue} onChange={(e: any) => setPostInputValue(e.target.value)} />
            </div>
            <div className={s.posts__form_additional}>
                <div className={s.addBlock}>
                    <Attach />
                </div>
                <div className={s.sendBlock}>
                    <button onClick={() => {
                        props.groopId && props.addPost(props.groopId, postInputValue)
                        setPostInputValue('')
                        
                    }
                    }>
                        Створити пост
                    </button>
                </div>
            </div>
        </div>

        {groopsItems}
    </div>
}