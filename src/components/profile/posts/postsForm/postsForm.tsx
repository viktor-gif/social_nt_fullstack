
import s from "./postsForm.module.css"
import avatar from "../../../../img/ava_male.jpeg"
import React, { useState } from "react"
import { ProfileDataType } from "../../../../ts/profile"

type PropsType = {
    authProfileData: ProfileDataType | null
    profileData: ProfileDataType | null

    addPost: (userId: string, postText: string) => void
}

export const PostsForm = React.memo((props: PropsType) => {

    const [currentPostText, setCurrentPostText] = useState('')

    const addPost = () => {
        props.profileData && props.addPost(props.profileData._id, currentPostText)
        setCurrentPostText('')
    }

  return <div className={s.postsForm}>
    <div className={s.inputBlock}>
      <img src={props.authProfileData?.photos.small || avatar} alt="ava" />
          <textarea value={currentPostText}
              onChange={(e: any) => setCurrentPostText(e.target.value)}

            onKeyDown={(e: any) => {
                if (e.keyCode === 13) {
                    addPost()
                }
            }}
        placeholder="Що у вас нового?" />
    </div>
    <div className={s.buttonBlock}>
        <button
            onClick={addPost}
        >
            Створити новий пост
        </button>
    </div>
  </div>
})