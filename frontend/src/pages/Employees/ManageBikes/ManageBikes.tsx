import axios from 'axios';
import React, { useEffect, useState } from 'react'
import EditableTable, { TableType } from '../EditableTable'
import "./ManageBikes.css";

const tableColumns = [
    { name: "", type: TableType.image },
    { name: "Type", type: TableType.enum, options: ['mens', 'womens'] },
    { name: "Grootte", type: TableType.int },
    { name: "Elektrisch", type: TableType.boolean },
    { name: "Kleur", type: TableType.string },
    { name: "Merk", type: TableType.string },
    { name: "Model", type: TableType.string },
    { name: "Inkoopdatum", type: TableType.date },
    { name: "Dagprijs", type: TableType.int },
    { name: "Weekend-prijs", type: TableType.int },
    { name: "Weekprijs", type: TableType.int },
    { name: "Maandprijs", type: TableType.int }
];

export default function ManageBikes() {
    const [bikes, setBikes] = useState<any[][]>([]);

    useEffect(() => {
        getBikes();
    }, []);

    type BikeResponse = {
        image: string,
        type: string,
        size: number,
        electric: boolean,
        color: string,
        brand: string,
        model: string,
        buyDate: object,
        dayPrice: number,
        weekendPrice: number,
        weekPrice: number,
        monthPrice: number
    }[];

    async function getBikes() {
        axios.get(`${process.env.REACT_APP_URL}/api/bikes`, {
            params: {
                username: sessionStorage.getItem('username'),
                token: sessionStorage.getItem('token')
            }
        })
            .then((res) => {
                const bikes: BikeResponse = res.data;
                // console.log(bikes);
                setBikes(bikes.map(x => Object.values(x)));
            })
            .catch(error => console.error(`Error: ${error}`));
    }

    return (
        <div className="manageBikes field">
            <EditableTable columns={tableColumns} content={bikes} />
        </div>
    )
}
