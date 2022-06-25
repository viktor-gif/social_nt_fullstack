import s from "./login.module.css"
import { Formik, Form, Field } from 'formik'
import React, { useState } from "react"
import { Navigate } from "react-router-dom"
import { login } from "../../redux/authReducer"
import { connect } from "react-redux"
import { AppStateType } from "../../redux/redux-store"
import { AuthDataType } from "../../ts/auth"

type PropsType = {
    loginError: string | null
    isAuth: boolean
    authData: AuthDataType | null

    login: (login: string, email: string, password: string) => void
}

export const Login = React.memo((props: PropsType) => {

    if (props.isAuth && props.authData) return <Navigate replace to={`/profile/${props.authData.id}`} />
    
    return <div className={s.login}>
        <Formik
            initialValues={{
           
            }}
            onSubmit={(val: any) => {
                props.login(val.login, val.email, val.password)
            }}
        >
        {({ isSubmitting }) => (
                <Form>
                    <div className={s.login__formItem}>Логін: 
                        <Field type="text" name="login" id="login" placeholder="Ваш логін..." />
                    </div>
                    <div className={s.login__formItem}>E-mail: 
                        <Field type="email" name="email" id="email" placeholder="Ваш email..." />
                    </div>
                    <div className={s.login__formItem}>Пароль: 
                        <Field type="password" name="password" id="password" placeholder="Ваш пароль..." />
                    </div>
                    {props.loginError && <div className={s.login__error}>{props.loginError}</div>}
                <button type="submit">
                    Submit
                </button>
            </Form>
            )}
        </Formik>
    </div>

})

const mapStateToProps = (state: AppStateType) => ({
    loginError: state.auth.loginError,
    isAuth: state.auth.isAuth,
    authData: state.auth.ownerData
})

export default connect(mapStateToProps, {
    login
})(Login)