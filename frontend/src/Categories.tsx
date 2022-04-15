import React from 'react'
import Tab from './Tab'

export default function Categories(props: { categories: { category: string, bikeAmount: number }[] }) {
    const { categories } = props;
    return (
        <div>
            {categories.map((category: any) => (
                <Tab text={category.category} />
            ))}
        </div>
    )
}
