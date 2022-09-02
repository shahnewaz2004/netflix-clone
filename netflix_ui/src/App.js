import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Player from './Pages/Player';
import List from './Pages/List';
import Protected from './Pages/Protected';


function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Signup />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/dashboard' element={<Protected Component={Dashboard} /> } />
        <Route exact path='/player/:token/:poster/:videoId' element={<Protected Component={Player} /> }/>
        <Route exact path='/list/:token' element={<Protected Component={List} /> } />
      </Routes>
    </>
  )
}

export default App