import logo from '../../de Elstar logo + tekst.png';
import React, { useEffect, useState } from "react";
import './Home.css';
import axios from "axios";
import Categories from '../../Categories';

export default function Home() {
    const [categories, getCategories] = useState<{ category: string, img: any }[]>([]);

    const url = 'http://localhost:5000';

    useEffect(() => {
        getAllCategories();
    }, []);

    const getAllCategories = () => {
        axios.get(`${url}/api/categories`)
            .then((res) => {
                const categories: { category: string, img: any }[] = res.data;
                getCategories(categories);
            })
            .catch(error => console.error(`Error: ${error}`));
    }
    return (
        <>
            <nav>
                <img id="logo" src={logo} alt="Logo" />
                <form id="searchBarForm" >
                    <label>
                        <input type="text" id="searchBar" placeholder="Naar wat voor fiets bent u op zoek?" />
                    </label>
                </form>
                <div id="buttons" >
                    <a className="signUpButton" href="/signUp" > Aanmelden </a>
                    <a className="signInButton" href="https://dirkdev.com" > Inloggen </a>
                </div>
            </nav>
            <div className="slideBar" id="categories">
                <Categories categories={categories} />
            </div>
        </>
    );
}
