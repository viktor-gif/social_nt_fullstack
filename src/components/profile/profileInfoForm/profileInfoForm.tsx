import { Field, Form, Formik } from "formik"
import { ProfileDataType } from "../../../ts/profile"
import s from "./profileInfoForm.module.css"

type PropsType = {
    profile: ProfileDataType | null
    setEditProfile: (isEdit: boolean) => void
    updateProfile: (data: ProfileDataType) => void
    getProfile: (userId: string) => void
    setPostsActive: (isActive: boolean) => void
}

export const ProfileInfoForm = (props: PropsType) => {
    
    const profile = props.profile
    
    const profileContacts = profile?.contacts
    const profileContactsKeys = profile ? Object.keys(profile.contacts) : null
    const contactsItems = profileContactsKeys?.map(p => {
        return <li key={p}>
        
            <span>{p}</span>: <Field type="text" name={p} id={p} placeholder={`Ваш ${p}...`} />
        </li>
    })
//{profileContacts[p]}

    return <div className={s.profileInfoForm}>
        <Formik
            initialValues = {{
                fullName: profile?.fullName,
                aboutMe: profile?.aboutMe,
                lookingForAJob: profile?.lookingForAJob,
                lookingForAJobDescription: profile?.lookingForAJobDescription,
                country: profile?.location.country,
                city: profile?.location.city,
                facebook: profile?.contacts.facebook,
                github: profile?.contacts.github,
                instagram: profile?.contacts.instagram,
                website: profile?.contacts.website,
                linkedin: profile?.contacts.linkedin,
                youtube: profile?.contacts.youtube,
                twitter: profile?.contacts.twitter
            }}
            onSubmit={(val: any) => {
                props.updateProfile(val)
                profile && props.getProfile(profile?._id)
                props.setEditProfile(false)
                props.setPostsActive(true)
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div>
                        Ім'я: <Field type="text" name="fullName" id="fullName" placeholder="Ваше повне ім'я..." />
                    </div>
                    <div>
                        Про себе: <Field type="text" name="aboutMe" id="aboutMe" placeholder="Розкажіть про себе..." component="textarea" />
                    </div>
                    <div>
                        Шукаю роботу: <Field type="checkbox" name="lookingForAJob" id="lookingForAJob" />
                    </div>
                    <div>
                        Описання майбутньої роботи: <Field type="text" name="lookingForAJobDescription"
                            id="lookingForAJobDescription" placeholder="Опишіть свою майбутню pоботу..." component="textarea" />
                    </div>
                    <div>Місце проживання: {profile?.location.city} {profile?.location.country}
                        <div>
                            Країна: <Field type="text" name="country" id="country" placeholder="Ваша країна..." />
                        </div>
                        <div>
                            Місто: <Field type="text" name="city" id="city" placeholder="Ваше місто або населений пункт..." />
                        </div>
                    </div>
                    
                    <ul>Контакти: 
                        {contactsItems}
                    </ul>
                    <button type="submit">Зберегти зміни</button>
                </Form>
            )}
        </Formik>
    </div>
}
