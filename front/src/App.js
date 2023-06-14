import React from 'react';
import {  BrowserRouter, Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container.js';
import Signup from './pages/signup.js';
import Display from './pages/displayShows.js';
import AddItem from './components/addItems.js';
import './App.css';





function App() {
  return (
    <Container className='d-flex align-items-center justify-content-center'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup/>}/>
        </Routes>
        <Routes>
          <Route path='/displayShows' element={<Display/>}/>
        </Routes>
      </BrowserRouter>
    </Container>
    
  );
}

export default App;


