import React, { ChangeEvent, useEffect, useState } from "react"
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
import { SearchInput } from "../common/searchInput/SearchInput"
import { Button } from "../common/button/Button"

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
        getUserProfile={props.getUserProfile} followers={u.followers} />
  })
  
    return <div className={s.users}>
        <div className={s.users__nav}>
            
        <div className={s.users__buttons}>
          <Button onClick={() => console.log('click')}
            value="Усі користувачі" />
          <Button onClick={() => console.log('click')}
            value="Тільки друзі" />
        </div>
            <div className={s.users__form}>
                <UsersForm getUsers={props.getUsers} pageSize={pageSize} />
            </div>
      </div>
      <div className={s.users__paginator}>
                <Paginator pageSize={pageSize} totalUsersCount={props.totalUsersCount}
                    setCurrentPage={setCurrentPage} currentPage={currentPage} />
        </div>

        {usersItems}
    </div>
})

type FormPropsType = {
    getUsers: (pageSize: number, pageNumber: number, term: string) => void
    pageSize: number
}
const UsersForm = (props: FormPropsType) => {
  const [inputValue, setInputValue] = useState('')
  const getTermUsers = () => {
    props.getUsers(props.pageSize, 1, inputValue)
    setInputValue('')
  }
  return (
    // <Formik
    //    initialValues={{ term: '' }}
    //    onSubmit={(val) => {
    //      props.getUsers(props.pageSize, 1, val.term)
    //    }}
    //  >
    //    {({ isSubmitting }) => (
    //      <Form>
    //       <Field type="text" name="term"
    //         placeholder="Введіть ім'я користувача" />
    //        <button type="submit">
    //          Submit
    //        </button>
    //      </Form>
    //    )}
    // </Formik>
    <div className={s.usersForm}>
      <SearchInput placeholder="Введіть ім'я користувача"
        value={inputValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
      onKeyPress={(e: any) => {
        if (e.charCode === 13) {
          getTermUsers()
        }
        }}
       />
      
      <Button value="Знайти"
        onClick={getTermUsers}
      />
    </div>
    )
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