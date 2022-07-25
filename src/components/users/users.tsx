import React, { useEffect, useState } from "react"
import { User } from "./user/user"
import s from "./users.module.css"
import { Formik, Form, Field } from 'formik'
import { UserType } from "../../ts/users"
import { Paginator } from "../common/paginator/paginator"
import { getUsers, getTotalUsersCount } from "../../redux/usersReducer"
import store, { AppStateType } from "../../redux/redux-store"
import { connect } from "react-redux"
import { ProfileDataType } from "../../ts/profile"
import { profileActions } from "../../redux/profileReducer"

type PropsType = {
  users: UserType[] | null
  totalUsersCount: number | null

  getUsers: (pageSize: number, currentPage: number, term: string) => void
  getUserProfile: (data: ProfileDataType) => void
}

export const Users = React.memo((props: PropsType) => {
  const [pageSize, setPageSize] = useState(3)
  const [currentPage, setCurrentPage] = useState(1)
  
  const users = store.getState().usersPage.users
  const totalUsersCount = store.getState().usersPage.totalUsersCount
  

  useEffect(() => {
        props.getUsers(pageSize, currentPage, '')
    }, [currentPage])
  const usersItems = props.users?.map((u: any) => {
      return <User id={u.id} key={u.id} fullName={u.fullName}
        location={u.location} status={u.status} photos={u.photos}
        getUserProfile={props.getUserProfile} />
    })
    return <div className={s.users}>
        <div className={s.users__nav}>
            <div className={s.users__form}>
                <UsersForm getUsers={props.getUsers} pageSize={pageSize} />
            </div>
            <div className={s.users__paginator}>
                <Paginator pageSize={pageSize} totalUsersCount={props.totalUsersCount}
                    setCurrentPage={setCurrentPage} currentPage={currentPage} />
            </div>
        </div>

        {usersItems}
    </div>
})

type FormPropsType = {
    getUsers: (pageSize: number, pageNumber: number, term: string) => void
    pageSize: number
}
const UsersForm = (props: FormPropsType) => {
    return <Formik
       initialValues={{ term: '' }}
       onSubmit={(val) => {
         props.getUsers(props.pageSize, 1, val.term)
       }}
     >
       {({ isSubmitting }) => (
         <Form>
           <Field type="text" name="term" />
           <button type="submit">
             Submit
           </button>
         </Form>
       )}
     </Formik>
}
const mapStateToProps = (state: AppStateType) => ({
  users: state.usersPage.users,
  totalUsersCount: state.usersPage.totalUsersCount
})
export default connect(mapStateToProps, {
  getUsers,
  getTotalUsersCount,
  getUserProfile: profileActions.setProfileData
})(Users)