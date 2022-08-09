import { Field, Form, Formik } from "formik"
import { ProfileDataType } from "../../../ts/profile"
import { Button } from "../../common/button/Button"
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
        
            <span className={s.fieldName}>{p}:</span>
            <span className={s.fieldInput}>
                <Field type="text" name={p} id={p} placeholder={`Ваш ${p}...`} />
            </span>
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
                    <div className={s.formikForm}>
                        <div className={s.formItem}>
                            <span className={s.fieldName}>Ім'я:</span>
                            <span className={s.fieldInput}>
                                <Field type="text" name="fullName" id="fullName" placeholder="Ваше повне ім'я..." />

                            </span>
                        </div>
                        <div className={s.formItem}>
                            <span className={s.fieldName}>Країна:</span>
                            <span className={s.fieldInput}>
                                <Field type="text" name="country" id="country" placeholder="Ваша країна..." />

                            </span>
                        </div>
                        <div className={s.formItem}>
                            <span className={s.fieldName}>Місто:</span>
                            <span className={s.fieldInput}>
                                <Field type="text" name="city" id="city" placeholder="Ваше місто або населений пункт..." />

                            </span>
                        </div>
                        <div className={s.formItem}>
                            <span className={s.fieldName}>Шукаю роботу:</span>
                            <span className={s.fieldInput}>
                                <Field type="checkbox" name="lookingForAJob" id="lookingForAJob" />

                            </span>
                        </div>
                        

                        <ul className={s.contacts}>
                            <span className={s.contactsName}>Контакти: </span>
                            {contactsItems}
                        </ul>

                        <div className={s.formItem}>
                            <span className={s.fieldName}>Про себе:</span>
                            <span className={s.fieldInput}>
                                <Field type="text" name="aboutMe" id="aboutMe" placeholder="Розкажіть про себе..." component="textarea" />

                            </span>
                        </div>
                        <div className={s.formItem}>
                            <span className={s.fieldName}>Опис роботи:</span>
                            <span className={s.fieldInput}>
                                <Field type="text" name="lookingForAJobDescription"
                                    id="lookingForAJobDescription" placeholder="Опишіть свою майбутню pоботу..." component="textarea" />
                            </span>
                            
                        </div>
                        {/* <button className={s.submitButton} type="submit">Зберегти зміни</button> */}
                        <div className={s.submitButton}>
                            <Button value="Зберегти зміни" />
                        </div>
                        
                    </div>
                </Form>
            )}
        </Formik>
    </div>
}
