import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../main.css';

import Home from './Customers/Home/Home';
import Register from './Account/Register';
import SignIn from './Account/SignIn';
import Employee from './Employees/Home/Home';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/employee/*" element={<Employee />} />
            </Routes>
            {/* <Notifications></Notifications> */}
        </BrowserRouter>
    )
}

export default App;