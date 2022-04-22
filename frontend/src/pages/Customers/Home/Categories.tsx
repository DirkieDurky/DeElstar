import React from 'react'
import Card from './Card'

function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function Categories(props: { categories: { category: string, img: any }[] }) {
    const { categories } = props;
    let tabs = [];
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        tabs.push(<Card key={i} img={category.img} text={capitalizeFirstLetter(category.category)} light={i % 2 === 1} />);
    }
    return (
        <>
            {tabs}
        </>
    )
}
