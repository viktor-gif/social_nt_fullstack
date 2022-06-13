import React from 'react';
import './App.css';
import Users from './components/users/users';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Nav } from './components/aside/nav/nav';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="app__header">
          Header
        </header>
        <main className="app__main">
          <Routes>
            {/* @ts-ignor */}
            <Route path='/users' element={<Users />} />
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

export default App;
