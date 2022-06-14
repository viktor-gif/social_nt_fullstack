import React, { useEffect } from 'react';
import './App.css';
import Users from './components/users/users';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Nav } from './components/aside/nav/nav';
import Header from './components/header/header';
import { CreateUser} from './components/users/createUser /createUser';
import Login from './components/login/login';
import { me } from './api/auth';
import { authActions } from './redux/authReducer';
import { connect } from 'react-redux';
import { appStateType } from './redux/redux-store';
import { AuthDataType } from './ts/auth';

type PropsType = {
  authData: AuthDataType | null
  getAuthData: (data: AuthDataType) => void
}

function App(props: PropsType) {
  useEffect(() => {
    me().then(res => props.getAuthData(res.data))
  }, [props.authData])
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

const mapStateToProps = (state: appStateType) => ({
  authData: state.auth.ownerData
})

export default connect(mapStateToProps, {
  getAuthData: authActions.setAuthData
})(App);
