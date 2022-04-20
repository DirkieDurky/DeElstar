import logo from '../../../de Elstar logo + tekst.png';
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar(props: { username: string | null }) {
    const { username } = props;
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <nav className="employee nav">
            <a href="/">
                <img className="employee logo" src={logo} alt="logo" />
            </a>
            <div className="tabs">
                <Link to="manageBikes" className={`tab${location.pathname === "/employee/manageBikes" ? " selected" : ""}`}><span>Fietsen beheren </span></Link>
                <Link to="rentingOut" className={`tab${location.pathname === "/employee/rentingOut" ? " selected" : ""}`}><span>Verhuren </span></Link>
                <Link to="manageCustomers" className={`tab${location.pathname === "/employee/manageCustomers" ? " selected" : ""}`}><span>Klanten beheren </span></Link>
                <Link to="manageEmployees" className={`tab${location.pathname === "/employee/manageEmployees" ? " selected" : ""}`}><span>Medewerkers beheren </span></Link>
            </div>
            <div className="logout">
                <span className="employee username">{username}</span>
                <Link className="employee SignOut button" onClick={() => { sessionStorage.clear(); navigate("/signIn") }} to="/"> Uitloggen </Link>
            </div>
        </nav>
    )
}
