import React from 'react'
import Card from './Card'

export default function Categories(props: { categories: { category: string, img: any }[] }) {
    const { categories } = props;
    let tabs = [];
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        tabs.push(<Card key={i} img={category.img} text={category.category} light={i % 2 === 1} />);
    }
    return (
        <>
            {tabs}
        </>
    )
}
