import React from 'react'
import './Home.css';
import Navbar from './Navbar';
import { Routes, Route } from 'react-router-dom';

import ManageBikes from '../ManageBikes/ManageBikes';
import RentingOut from '../RentingOut/RentingOut';
import ManageCustomers from '../ManageCustomers/ManageCustomers';
import ManageEmployees from '../ManageEmployees/ManageEmployees';

export default function Home() {
    return (
        <>
            <div className="employeeBody">
                <Navbar />
                <Routes>
                    <Route path="manageBikes" element={<ManageBikes />} />
                    <Route path="rentingOut" element={<RentingOut />} />
                    <Route path="manageCustomers" element={<ManageCustomers />} />
                    {true ? <Route path="manageEmployees" element={<ManageEmployees />} /> : null}
                </Routes>
            </div >
        </>
    )
}
