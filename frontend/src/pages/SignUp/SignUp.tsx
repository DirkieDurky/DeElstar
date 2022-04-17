import logo from '../../de Elstar logo + tekst.png';
import React, { useEffect, useState } from "react";
import './SignUp.css';
import axios from "axios";

export default function SignUp() {
    return (
        <>
            <div className="field">
                <img className="logo" src={logo} alt="logo" />
                <h1 className="header">Registreren</h1>
                <form className="form">
                    <label>
                        Gebruikersnaam:<br></br>
                        <input type="text" name="username" placeholder="Gebruikersnaam" /><br></br>
                    </label>
                    <label>
                        Email:<br></br>
                        <input type="text" name="email" placeholder="Email" /><br></br>
                    </label>
                    <label>
                        Wachtwoord:<br></br>
                        <input type="password" name="pass" placeholder="Wachtwoord" /><br></br>
                    </label>
                    <label>
                        Wachtwoord herhalen:<br></br>
                        <input type="password" name="pass2" placeholder="Wachtwoord herhalen" /><br></br>
                    </label>
                    <input type="submit" name="submit" value="Registreren" />
                </form>
            </div>
        </>
    )
}