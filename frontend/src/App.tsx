import logo from './de Elstar logo + tekst.png';
import './App.css';
import axios from "axios";

async function query(query: string) {
    return axios.post('http://localhost:5000/api/query', query, {
        headers: {
            'content-type': 'text/plain'
        }
    })
}

function App() {
    return (
        <>
            <nav>
                <img id="logo" src={logo} alt="Logo" />
                <form id="searchBarForm">
                    <label>
                        <input type="text" id="searchBar" placeholder="Naar wat voor fiets bent u op zoek?" />
                    </label>
                </form>
                <div id="buttons">
                    <a className="signUpButton" href="https://tetris.dirkdev.com">Aanmelden</a>
                    <a className="signInButton" href="https://dirkdev.com">Inloggen</a>
                    <button onClick={async () => {
                        const db = await query("SELECT * FROM `customers`");
                        console.log(db);
                    }}>Test</button>
                </div>
            </nav>
            <div className="slideBar">

            </div>
        </>
    );
}

export default App;
