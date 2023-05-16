import { useEffect, useState } from 'react';
import './App.css';
import Users from './components/users/users';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Nav from './components/aside/nav/nav';
import Header from './components/header/header';
import Login from './components/login/login';
import { authMe } from './redux/authReducer';
import { connect } from 'react-redux';
import { AppStateType } from './redux/redux-store';
import { AuthDataType } from './ts/auth';
import Profile from './components/profile/profile'
import DialogsPage from './components/dialogsPage/dialogsPage';
import CommonVideo from './components/commonVideo/commonVideo';
import CommonAudio from './components/commonAudio/commonAudio';
import CommonImg from './components/commonImg/commonImg';
import Groops from './components/groops/groops';
import GroopInfo from './components/ groopInfo/groopInfo';
import DeletedProfile from './components/deletedProfile/deletedProfile';
import { BooleanDialogWindow } from './components/common/booleanDialogWindow/booleanDialogWindow';

type PropsType = {
  authData: AuthDataType | null
  isAuth: boolean

  authMe: () => void
}

function App(props: PropsType) {
  const [isBooleanDialogWindowActive, setBooleanDialogWindowActive] = useState(false)
  const [booleanDialogInfo, setBooleanDialogInfo] = useState('')
  const [booleanDialogYesButtonHandler, setBooleanDialogYesButtonHandler] = useState<(() => void) | null>(null)

  const allUnhandledErrors = (error: any) => {
    console.log(error)
  }

  useEffect(() => {
    window.addEventListener("unhandledrejection", allUnhandledErrors)
    return () => {
      window.removeEventListener("unhandledrejection", allUnhandledErrors)
    }
  }, [])

  useEffect(() => {
    // authAPI.me().then(res => {
    //   props.getAuthData(res.data)
    // }) 
    props.authMe()
  }, [props.authData?.blockedAccaunt])

  

  // if (props.authData?.blockedAccaunt) {
  //   return <div>
  //     <img src={deletedAccauntAvatar} alt="DELETED" />
  //     <span>Сторінку {props.authData.id} видалено</span>
  //     <button onClick={() => props.restoreUser()}>Відновити сторінку</button>
  //   </div>
  // }

  return (
    <BrowserRouter>
      <div className="app">
        <header className="app__header">
          <Header setBooleanDialogInfo={setBooleanDialogInfo} setBooleanDialogYesButtonHandler={setBooleanDialogYesButtonHandler}
            setBooleanDialogWindowActive={setBooleanDialogWindowActive} />
        </header>
        {props.authData?.blockedAccaunt
          ?<DeletedProfile />
          : <main className="app__main">
            {!props.isAuth
              ? <Login />
              : <Routes>
                <Route path='/users' element={<Users />} />
                <Route path='/login' element={<Login />} />
                <Route path='/profile/:userId' element={<Profile />} />
                <Route path='/dialogs' element={<DialogsPage />} />
                <Route path='/commonVideo' element={<CommonVideo />} />
                <Route path='/commonAudio' element={<CommonAudio />} />
                <Route path='/commonImg' element={<CommonImg />} />
                <Route path='/groops' element={<Groops />} />
                <Route path='/groopInfo/:groopId/*' element={<GroopInfo />} />
              </Routes>
            }
          </main>
          }
          <aside className="app__aside">
            <Nav />
          </aside>
          <footer className="app__footer">
            Footer
          </footer>
          {isBooleanDialogWindowActive
          && <BooleanDialogWindow setDialogWindowActive={setBooleanDialogWindowActive}
            yesButtonHandler={booleanDialogYesButtonHandler} dialogInfo={booleanDialogInfo} />
          }
        </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state: AppStateType) => ({
  authData: state.auth.authData,
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {
  //getAuthData: authActions.setAuthData
  authMe
})(App);
