import React from 'react';
import './global.css'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/HomePage';
import SingleNotePage from './pages/SingleNotePage';

const App = () => {
    return(
        <Routes>
            <Route path = '/' element ={<Home />} />
            <Route exact path='/notes/:id' element = {<SingleNotePage />} />
        </Routes>
    );
}

export default App;