import React, { ChangeEvent, useEffect, useState } from "react"
import { User } from "./user/user"
import s from "./users.module.css"
import { UserType } from "../../ts/users"
import { Paginator } from "../common/paginator/paginator"
import { getUsers, getTotalUsersCount } from "../../redux/usersReducer"
import store, { AppStateType } from "../../redux/redux-store"
import { connect } from "react-redux"
import { ProfileDataType } from "../../ts/profile"
import { profileActions } from "../../redux/profileReducer"
import { SearchInput } from "../common/searchInput/SearchInput"
import { Button } from "../common/button/Button"
import { AuthDataType } from "../../ts/auth"
import { setTokenSourceMapRange } from "typescript"

type PropsType = {
  users: UserType[] | null
  totalUsersCount: number | null
  authData: AuthDataType | null

  getUsers: (pageSize: number, currentPage: number, term: string, friendStatus: string) => void
  getUserProfile: (data: ProfileDataType) => void
}

export const Users = React.memo((props: PropsType) => {
  const [pageSize, setPageSize] = useState(3)
  const [currentPage, setCurrentPage] = useState(1)
  const [term, setTerm] = useState('')
  const [friendStatus, setFriendStatus] = useState('all')
  

  useEffect(() => {
        props.getUsers(pageSize, currentPage, term, friendStatus)
    }, [currentPage, friendStatus, term])
  const usersItems = props.users
    // ?.filter(u => {
    //   u.followers.forEach(f => f) !== null
    // })
    ?.map((u: any) => {
      return <User id={u.id} key={u.id} fullName={u.fullName}
        location={u.location} status={u.status} photos={u.photos}
        getUserProfile={props.getUserProfile} followers={u.followers}
        authData={props.authData} />
  })
  console.log(props.users?.map(u => u.followers))
    return <div className={s.users}>
        <div className={s.users__nav}>
            
        <div className={s.users__buttons}>
          <Button onClick={() => setFriendStatus('all')}
            value="Усі користувачі" />
          <Button onClick={() => setFriendStatus('friends')}
            value="Тільки друзі" />
          <Button onClick={() => setFriendStatus('followers')}
            value="Вхідні заявки" />
          <Button onClick={() => setFriendStatus('followed')}
            value="Ваші заявки" />
        </div>
            <div className={s.users__form}>
          <UsersForm getUsers={props.getUsers} pageSize={pageSize}
            setTerm={setTerm} />
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
    getUsers: (pageSize: number, pageNumber: number, term: string, friendStatus: string) => void
    pageSize: number
    setTerm: (tetm: string) => void
}
const UsersForm = (props: FormPropsType) => {
  const [inputValue, setInputValue] = useState('')
  // const getTermUsers = () => {
  //   props.getUsers(props.pageSize, 1, inputValue, props.friendStatus)
  //   setInputValue('')
  // }
  return (
    <div className={s.usersForm}>
      <SearchInput placeholder="Введіть ім'я користувача"
        value={inputValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
      onKeyPress={(e: any) => {
        if (e.charCode === 13) {
          props.setTerm(inputValue)
        }
        }}
       />
      
      <Button value="Знайти"
        onClick={() => props.setTerm(inputValue)}
      />
    </div>
    )
}
const mapStateToProps = (state: AppStateType) => ({
  users: state.usersPage.users,
  totalUsersCount: state.usersPage.totalUsersCount,
  authData: state.auth.authData
})
export default connect(mapStateToProps, {
  getUsers,
  getTotalUsersCount,
  getUserProfile: profileActions.setProfileData
})(Users)