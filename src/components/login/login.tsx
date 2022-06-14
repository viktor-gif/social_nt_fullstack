import s from "./login.module.css"
import { Formik, Form, Field } from 'formik';
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { login, me } from "../../api/auth";
import { authActions } from "../../redux/authReducer";
import { connect } from "react-redux";
import { appStateType } from "../../redux/redux-store";
import { AuthDataType } from "../../ts/auth";

type PropsType = {
    getAuthData: (data: AuthDataType) => void
}

export const Login = React.memo((props: PropsType) => {
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [error, setError] = useState(null)

    if (isLoggedIn) return <Navigate replace to="/profile" />
    
    return <div className={s.login}>
        <Formik
            initialValues={{
           
            }}
            onSubmit={(val: any) => {
                login(val.login, val.email, val.password)
                    .then(res => {
                        me().then(res => {
                            props.getAuthData(res.data)
                            console.log(res.data)
                            // setLoggedIn(true)
                        })
                        
                })
                
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
                    {error && <div className={s.login__error}>{error}</div>}
                <button type="submit">
                    Submit
                </button>
            </Form>
            )}
        </Formik>
    </div>

})

const mapStateToProps = (state: appStateType) => ({

})

export default connect(mapStateToProps, {
    getAuthData: authActions.setAuthData
})(Login)