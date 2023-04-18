import s from "./login.module.css"
import { Formik, Form, Field } from 'formik';
import {usersAPI} from "../../api/users"
import { useState } from "react";

type PropsType = {
    usersError: string | null

    setSignedUp: (isSignedUp: boolean) => void
    createUser: (email: string, password: string, fullName: string) => void
}

export const SignUpForm = (props: PropsType) => {
    const [created, setCreated] = useState(false)
    const [error, setError] = useState(null)

    // if (created) return <Navigate replace to="/users" /> 
    
    return <Formik
            initialValues={{
           
            }}
            onSubmit={(val: any) => {
                // usersAPI.createUser(val.email, val.password, val.fullName)
                //     .then(res => {
                //         if (res.data.values) {
                //             setError(res.data.values);
                //         } else {
                //             setCreated(true)
                //             props.setSignedUp(true)
                //     }
                // })
                props.createUser(val.email, val.password, val.fullName)
            }}
        >
        {({ isSubmitting }) => (
            <Form>
                <div className={s.login__wrapForm}>
                    <div className={s.login__formItem}>
                        <Field type="email" name="email" id="email" placeholder="Ваш email..." />
                    </div>
                    <div className={s.login__formItem}>
                        <Field type="password" name="password" id="password" placeholder="Ваш пароль..." />
                    </div>
                    <div className={s.login__formItem}>
                        <Field type="text" name="fullName" id="fullName" placeholder="Ваше повне ім'я..." />
                    </div>
                    {props.usersError && <div className={s.createUser__error}>{props.usersError}</div>}
                    <button type="submit">
                        Зареєструватися
                    </button>
                    <span className={s.or}></span>
                    <button onClick={() => props.setSignedUp(true)}>
                        Ввійти
                    </button>
                </div>
                    
            </Form>
        )}
    </Formik>

}