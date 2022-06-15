import React, { useEffect, useState } from "react";
import { getUsers } from "../../api/users";
import { User } from "./user/user";
import s from "./users.module.css";
import { Formik, Form, Field } from 'formik';
import { UserType } from "../../ts/users";
import { Paginator } from "../common/paginator/paginator";
import { usersActions } from "../../redux/usersReducer";
import store, { appStateType } from "../../redux/redux-store";
import { connect } from "react-redux";
import { profileDataType } from "../../ts/profile";
import { profileActions } from "../../redux/profileReducer";

type PropsType = {
  users: UserType[] | null
  totalUsersCount: number | null

  getUsers: (users: UserType[]) => void
  getTotalUsersCount: (count: number) => void
  getUserProfile: (data: profileDataType) => void
}

export const Users = React.memo((props: PropsType) => {
  const [pageSize, setPageSize] = useState(3)
  const [currentPage, setCurrentPage] = useState(1)
  
  const users = store.getState().usersPage.users
  const totalUsersCount = store.getState().usersPage.totalUsersCount
  

    useEffect(() => {
        getUsers(pageSize, currentPage, '').then(res => {
          props.getUsers(res.data.items)
          props.getTotalUsersCount(res.data.totalCount)
        }) 
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
                    setCurrentPage={setCurrentPage} />
            </div>
        </div>

        {usersItems}
    </div>
})

type FormPropsType = {
    getUsers: (users: UserType[]) => void
    pageSize: number
}
const UsersForm = (props: FormPropsType) => {
    return <Formik
       initialValues={{ term: '' }}
       onSubmit={(val) => {
         getUsers(props.pageSize, 1, val.term).then(res => {
            
            props.getUsers(res.data.items)
        })
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
const mapStateToProps = (state: appStateType) => ({
  users: state.usersPage.users,
  totalUsersCount: state.usersPage.totalUsersCount
})
export default connect(mapStateToProps, {
  getUsers: usersActions.setUsers,
  getTotalUsersCount: usersActions.setTotalUsersCount,
  getUserProfile: profileActions.setProfileData
})(Users)