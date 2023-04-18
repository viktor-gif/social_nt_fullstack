import s from "./login.module.css"
import React, { useState } from "react"
import { Navigate } from "react-router-dom"
import { login } from "../../redux/authReducer"
import { createUser } from "../../redux/usersReducer"
import { connect } from "react-redux"
import { AppStateType } from "../../redux/redux-store"
import { AuthDataType } from "../../ts/auth"
import { LoginForm } from "./loginForm"
import { SignUpForm } from "./signUpForm"

type PropsType = {
    loginError: string | null
    isAuth: boolean
    authData: AuthDataType | null
    usersError: string | null

    login: (email: string, password: string) => void
    createUser: (email: string, password: string, fullName: string) => void
}

export const Login = React.memo((props: PropsType) => {
    const [isSignedUp, setSignedUp] = useState(true)
    console.log(props.loginError)
    if (props.isAuth && props.authData) return <Navigate replace to={`/profile/${props.authData.id}`} />
    
    return <div className={s.login}>
        <h1 className={s.login__title}>Перша українська соціальна мережа</h1>
        {isSignedUp
            ? <LoginForm loginError={props.loginError} isAuth={props.isAuth}
                authData={props.authData} login={props.login}
                setSignedUp={setSignedUp} />
            : <SignUpForm setSignedUp={setSignedUp} createUser={props.createUser}
                usersError={props.usersError} />
        }
        {/* {props.loginError && <div className={s.login__error}>{ props.loginError }</div>} */}
    </div>

})

const mapStateToProps = (state: AppStateType) => ({
    loginError: state.auth.loginError,
    isAuth: state.auth.isAuth,
    authData: state.auth.authData,
    usersError: state.usersPage.usersError
})

export default connect(mapStateToProps, {
    login, createUser
})(Login)