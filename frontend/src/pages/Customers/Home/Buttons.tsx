import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ResetVars } from './Home';

export default function Buttons(props: { loggedIn: boolean, username: string | null }) {
    const { loggedIn, username } = props;

    const resetVars = useContext(ResetVars);
    if (loggedIn) {
        return (
            <div id="buttons">
                <span className="username">{username}</span>
                <Link className="signOut button" onClick={() => { sessionStorage.clear(); resetVars() }} to="/"> Uitloggen </Link>
            </div>
        )
    } else {
        return (
            <div id="buttons">
                <Link className="register button" to="/register" > Registreren </Link>
                <Link className="signIn button" to="/signIn" > Inloggen </Link>
            </div>
        )
    }
}
