import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Home/Home';
import Register from './Account/Register';
import SignIn from './Account/SignIn';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/signIn" element={<SignIn />}></Route>
            </Routes>
            {/* <Notifications></Notifications> */}
        </BrowserRouter>
    )
}

export default App;