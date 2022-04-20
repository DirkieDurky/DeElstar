import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="employeeNav">
            <Link to="manageBikes" className={"tab"}><span>Fietsen beheren </span></Link>
            <Link to="rentingOut" className={"tab"}><span>Verhuren </span></Link>
            <Link to="manageCustomers" className={"tab"}><span>Klanten beheren </span></Link>
            {false ? <Link to="manageEmployees" className={"tab"}><span>Medewerkers beheren </span></Link> : null}
        </nav>
    )
}
