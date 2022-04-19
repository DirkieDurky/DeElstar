import logo from '../../de Elstar logo + tekst.png';
import { useState } from "react";
import './Account.css';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';

export default function SignUp() {
    const navigate = useNavigate();

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

    const [userErr, setUserErr] = useState("");
    const [passErr, setPassErr] = useState("");
    const [globalErr, setGlobalErr] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        await axios.post(`${process.env.REACT_APP_URL}/api/signIn`, {
            user: user,
            pass: pass,
        }).then((res) => {
            console.log(res.data.status);
            switch (res.data.status) {
                case 0: {
                    setUserErr("Er is geen account met deze gebruikernaam gevonden.");
                    break;
                }
                case 1: {
                    setPassErr("Dit wachtwoord is incorrect");
                    break;
                }
                case 2: {
                    sessionStorage.setItem('username', user);
                    sessionStorage.setItem('token', res.data.token);
                    navigate("/");
                    break;
                }
                default: {
                    console.log(res.data.status);
                }
            }

        }).catch((res) => {
            setGlobalErr(`Er ging iets mis vanuit onze kant. Sorry! Probeer het later opnieuw. (${res})`);
        });
    }

    return (
        <>
            <div className="field">
                <Link className="backButton" to="/">
                    Terug
                </Link>
                <Link to="/">
                    <img className="logo" src={logo} alt="logo" />
                </Link>
                <h1 className="header">Inloggen</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <label>
                        Gebruikersnaam:<br></br>
                        <input type="text" name="user" placeholder="Gebruikersnaam"
                            onChange={(e) => { setUser(e.target.value); setUserErr("") }} /><br></br>
                        <span className="error">{userErr}</span>
                    </label>
                    <label>
                        Wachtwoord:<br></br>
                        <input type="password" name="pass" placeholder="Wachtwoord"
                            onChange={(e) => { setPass(e.target.value); setPassErr("") }} /><br></br>
                        <span className="error">{passErr}</span>
                    </label>
                    <input type="submit" name="submit" value="Inloggen" /><br></br>
                    <span className="error">{globalErr}</span><br></br>
                    <span id="signInInstead">Heeft u nog geen account? Klik <Link to="/register">hier</Link> om een account aan te maken.</span>
                </form>
            </div>
        </>
    )
}