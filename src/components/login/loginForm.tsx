import s from "./login.module.css"
import { Formik, Form, Field } from 'formik'
import React from "react"
import { Navigate } from "react-router-dom"
import { AuthDataType } from "../../ts/auth"

type PropsType = {
    loginError: string | null
    isAuth: boolean
    authData: AuthDataType | null

    login: (email: string, password: string) => void
    setSignedUp: (isSignedUp: boolean) => void
}

export const LoginForm = React.memo((props: PropsType) => {

    if (props.isAuth && props.authData) return <Navigate replace to={`/profile/${props.authData.id}`} />
    
    return <Formik
            initialValues={{
           
            }}
            onSubmit={(val: any) => {
                props.login(val.email, val.password)
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
                    {props.loginError && <div className={s.login__error}>{props.loginError}</div>}
                    <button type="submit">
                        Ввійти
                    </button>
                    <span className={s.or}></span>
                    <button onClick={() =>  props.setSignedUp(false)}>
                        Зареєструватися
                    </button>
                </div>
                
            </Form>
            )}
        </Formik>

})