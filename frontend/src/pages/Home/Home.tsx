import logo from '../../de Elstar logo + tekst.png';
import React, { useEffect, useState } from "react";
import './Home.css';
import axios from "axios";
import Categories from '../../Categories';
import { Link } from 'react-router-dom';
import UserType from "../../UserType";

export default function Home() {
    const [categories, getCategories] = useState<{ category: string, img: any }[]>([]);

    useEffect(() => {
        getAllCategories();

        axios.get(`${process.env.REACT_APP_URL}/api/getSignedInUser`).then((res) => {
            const user: { id: number, username: string, email: string, type: UserType } | null = res.data;
            if (user === null) {
                console.log(`Not logged in`);
            } else {
                console.log(`Logged in as ${user.username}`);
            }
        });
    }, []);

    const getAllCategories = () => {
        axios.get(`${process.env.REACT_APP_URL}/api/categories`)
            .then((res) => {
                const categories: { category: string, img: any }[] = res.data;
                getCategories(categories);
            })
            .catch(error => console.error(`Error: ${error}`));
    }
    return (
        <>
            <nav>
                <a href="/">
                    <img id="logo" src={logo} alt="logo" />
                </a>
                <form id="searchBarForm" >
                    <label>
                        <input type="text" id="searchBar" placeholder="Naar wat voor fiets bent u op zoek?" />
                    </label>
                </form>
                <div id="buttons" >
                    <Link className="registerButton" to="/Register" > Registreren </Link>
                    <Link className="signInButton" to="/signIn" > Inloggen </Link>
                </div>
            </nav>
            <div className="slideBar" id="categories">
                <Categories categories={categories} />
            </div>
        </>
    );
}
