import logo from '../../de Elstar logo + tekst.png';
import React, { useEffect, useState } from "react";
import './SignUp.css';
import axios from "axios";

export default function SignUp() {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [pass2, setPass2] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // console.log(await axios.get(`${process.env.REACT_APP_URL}/api/register`, {
        //     params: {
        //         user: user
        //     }
        // }))
        const j = {
            user: user,
            email: email
        }
        console.log(await axios.post(`${process.env.REACT_APP_URL}/api/register`, j))
    }

    return (
        <>
            <div className="field">
                <a href="/">
                    <img className="logo" src={logo} alt="logo" />
                </a>
                <h1 className="header">Registreren</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <label>
                        Gebruikersnaam:<br></br>
                        <input type="text" name="user" placeholder="Gebruikersnaam"
                            onChange={(e) => { setUser(e.target.value) }} /><br></br>
                    </label>
                    <label>
                        Email:<br></br>
                        <input type="text" name="email" placeholder="Email"
                            onChange={(e) => { setEmail(e.target.value) }} /><br></br>
                    </label>
                    <label>
                        Wachtwoord:<br></br>
                        <input type="password" name="pass" placeholder="Wachtwoord"
                            onChange={(e) => { setPass(e.target.value) }} /><br></br>
                    </label>
                    <label>
                        Wachtwoord herhalen:<br></br>
                        <input type="password" name="pass2" placeholder="Wachtwoord herhalen"
                            onChange={(e) => { setPass2(e.target.value) }} /><br></br>
                    </label>
                    <input type="submit" name="submit" value="Registreren" />
                </form>
            </div>
        </>
    )
}