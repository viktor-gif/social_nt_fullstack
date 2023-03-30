import { useEffect } from 'react';
import './App.css';
import Users from './components/users/users';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './components/aside/nav/nav';
import Header from './components/header/header';
import { CreateUser} from './components/users/createUser /createUser';
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

type PropsType = {
  authData: AuthDataType | null
  //getAuthData: (data: AuthDataType) => void
  authMe: () => void
}

function App(props: PropsType) {
  useEffect(() => {
    // authAPI.me().then(res => {
    //   props.getAuthData(res.data)
    // }) 
    props.authMe()
  }, [])

  return (
    <BrowserRouter>
      <div className="app">
        <header className="app__header">
          <Header />
        </header>
        <main className="app__main">
          <Routes>
            <Route path='/users' element={<Users />} />
            <Route path='/user/add' element={<CreateUser />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile/:userId' element={<Profile />} />
            <Route path='/dialogs' element={<DialogsPage />} />
            <Route path='/commonVideo' element={<CommonVideo />} />
            <Route path='/commonAudio' element={<CommonAudio />} />
            <Route path='/commonImg' element={<CommonImg />} />
            <Route path='/groops' element={<Groops />} />
            <Route path='/groopInfo/:groopId/*' element={<GroopInfo />} />
          </Routes>
        </main>
        <aside className="app__aside">
          <Nav />
        </aside>
        <footer className="app__footer">
          Footer
        </footer>
        </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state: AppStateType) => ({
  authData: state.auth.authData
})

export default connect(mapStateToProps, {
  //getAuthData: authActions.setAuthData
  authMe
})(App);
