import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Register from './pages/Account/Register';
import SignIn from './pages/Account/SignIn';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/signIn" element={<SignIn />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;