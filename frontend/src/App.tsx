import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/signUp" element={<SignUp />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;