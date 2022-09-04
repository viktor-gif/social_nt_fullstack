
import s from "./postsForm.module.css"
import avatar from "../../../../img/ava_male.jpeg"
import React, { useState } from "react"
import { ProfileDataType } from "../../../../ts/profile"
import { Attach } from "react-ionicons"

type PropsType = {
    authProfileData: ProfileDataType | null
    profileData: ProfileDataType | null
    postFile: any

    addPost: (userId: string, postText: string, file: any) => void
    setPostFile: (file: any) => void
}

export const PostsForm = React.memo((props: PropsType) => {

    const [currentPostText, setCurrentPostText] = useState('')

    const addPost = () => {
        props.profileData && props.addPost(props.profileData._id, currentPostText, props.postFile)
        setCurrentPostText('')
        props.setPostFile(null)
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
    <div className={s.iconsBlock}>
        <label htmlFor="postFile" className={s.attachIcon}>
            <Attach width="30px" height="30px" />
            <input type="file" id="postFile" onChange={(e: any) => {
                props.setPostFile(e.target.files[0])
            }} />
        </label>
        
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