
import s from "./createUser.module.css"
import { Formik, Form, Field } from 'formik';
import {createUser} from "../../../api/users"
import { useState } from "react";
import { Navigate } from "react-router-dom";

type PropsType = {
    
}

export const CreateUser = (props: PropsType) => {
    const [created, setCreated] = useState(false)
    const [error, setError] = useState(null)

    if (created) return <Navigate replace to="/users" />
    
    return <div className={s.createUser}>
        <Formik
            initialValues={{
           
            }}
            onSubmit={(val: any) => {
                createUser(val.login, val.email, val.password, val.fullName)
                    .then(res => {
                        if (res.data.values) {
                            setError(res.data.values);
                        } else {
                            setCreated(true) 
                    }
                })
                
            }}
        >
        {({ isSubmitting }) => (
                <Form>
                    <div className={s.createUser__formItem}>Повне ім'я: 
                        <Field type="text" name="fullName" id="fullName" placeholder="Ваше повне ім'я..." />
                    </div>
                    <div className={s.createUser__formItem}>Логін: 
                        <Field type="text" name="login" id="login" placeholder="Ваш логін..." />
                    </div>
                    <div className={s.createUser__formItem}>E-mail: 
                        <Field type="email" name="email" id="email" placeholder="Ваш email..." />
                    </div>
                    <div className={s.createUser__formItem}>Пароль: 
                        <Field type="password" name="password" id="password" placeholder="Ваш пароль..." />
                    </div>
                    {error && <div className={s.createUser__error}>{error}</div>}
                <button type="submit">
                    Submit
                </button>
            </Form>
            )}
        </Formik>
    </div>

}

// const mapStateToProps = (state: appStateType) => ({
    
// })

//export default connect(mapStateToProps, {})(CreateUser)