import s from "./login.module.css"
import { Formik, Form, Field } from 'formik';
import {usersAPI} from "../../api/users"
import { useState } from "react";

type PropsType = {
    setSignedUp: (isSignedUp: boolean) => void
}

export const SignUpForm = (props: PropsType) => {
    const [created, setCreated] = useState(false)
    const [error, setError] = useState(null)

    // if (created) return <Navigate replace to="/users" />
    
    return <Formik
            initialValues={{
           
            }}
            onSubmit={(val: any) => {
                usersAPI.createUser(val.login, val.email, val.password, val.fullName)
                    .then(res => {
                        if (res.data.values) {
                            setError(res.data.values);
                        } else {
                            setCreated(true)
                            props.setSignedUp(true)
                    }
                })
                
            }}
        >
        {({ isSubmitting }) => (
            <Form>
                <div className={s.login__wrapForm}>
                    <div className={s.login__formItem}>
                        <Field type="text" name="fullName" id="fullName" placeholder="Ваше повне ім'я..." />
                    </div>
                    <div className={s.login__formItem}>
                        <Field type="text" name="login" id="login" placeholder="Ваш логін..." />
                    </div>
                    <div className={s.login__formItem}>
                        <Field type="email" name="email" id="email" placeholder="Ваш email..." />
                    </div>
                    <div className={s.login__formItem}>
                        <Field type="password" name="password" id="password" placeholder="Ваш пароль..." />
                    </div>
                    {error && <div className={s.createUser__error}>{error}</div>}
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