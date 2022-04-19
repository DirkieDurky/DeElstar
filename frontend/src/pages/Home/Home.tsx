import logo from '../../de Elstar logo + tekst.png';
import React, { useEffect, useState } from "react";
import './Home.css';
import axios from "axios";
import Categories from './Categories';
import Buttons from "./Buttons";

export const ResetVars = React.createContext(() => { });

export default function Home() {
    const [categories, setCategories] = useState<{ category: string, img: any }[]>([]);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [username, setUsername] = useState<string | null>(null);

    function resetVars() {
        setLoggedIn(false);
        setUsername(null);
    }

    useEffect(() => {
        getAllCategories();

        const user = sessionStorage.getItem('username');
        if (user !== undefined) {
            axios.get(`${process.env.REACT_APP_URL}/api/getUserToken`, {
                params: {
                    user
                }
            })
                .then((res) => {
                    const token = sessionStorage.getItem('token');
                    if (token !== null && res.data === token) {
                        setLoggedIn(true);
                        setUsername(user);
                    }
                })
        }
    }, []);

    function getAllCategories() {
        axios.get(`${process.env.REACT_APP_URL}/api/categories`)
            .then((res) => {
                const categories: { category: string, img: any }[] = res.data;
                setCategories(categories);
            })
            .catch(error => console.error(`Error: ${error}`));
    }

    return (
        <>
            <nav>
                <a href="/">
                    <img id="logo" src={logo} alt="logo" />
                </a>
                <input type="text" id="searchBar" placeholder="Naar wat voor fiets bent u op zoek?" />
                <ResetVars.Provider value={resetVars}>
                    <Buttons loggedIn={loggedIn} username={username} />
                </ResetVars.Provider>
            </nav>
            <div className="slideBar" id="categories">
                <Categories categories={categories} />
            </div>
        </>
    );
}