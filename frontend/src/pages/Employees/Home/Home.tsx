import React, { useEffect, useState } from "react";
import './Home.css';
import Navbar from './Navbar';
import { Routes, Route } from 'react-router-dom';

import ManageBikes from '../ManageBikes/ManageBikes';
import RentingOut from '../RentingOut/RentingOut';
import ManageCustomers from '../ManageCustomers/ManageCustomers';
import ManageEmployees from '../ManageEmployees/ManageEmployees';

export const ResetVars = React.createContext(() => { });

export default function Home() {
    const [username, setUsername] = useState<string | null>(sessionStorage.getItem('username'));

    return (
        <>
            {
                (username === null) ?
                    <div className="noAccess"><span>Je hebt niet de benodigde rechten om op deze pagina te zijn.</span> </div>
                    :
                    <div className="employee body">
                        <Navbar username={username} />
                        <Routes>
                            <Route path="manageBikes" element={<ManageBikes />} />
                            <Route path="rentingOut" element={<RentingOut />} />
                            <Route path="manageCustomers" element={<ManageCustomers />} />
                            <Route path="manageEmployees" element={<ManageEmployees />} />
                        </Routes>
                    </div >
            }
        </>
    )
}
