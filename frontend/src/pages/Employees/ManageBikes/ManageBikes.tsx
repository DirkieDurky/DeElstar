import axios from 'axios';
import React, { useEffect, useState } from 'react'
import EditableTable, { TableType } from '../EditableTable'
import "./ManageBikes.css";

const typeTranslation: { [name: string]: string } = {};
typeTranslation["mens"] = "Mannen";
typeTranslation["womens"] = "Vrouwen";

const tableColumns = [
    { id: "image", name: "", type: TableType.image },
    { id: "type", name: "Type", type: TableType.enum, options: [typeTranslation.mens, typeTranslation.womens] },
    { id: "size", name: "Grootte", type: TableType.int },
    { id: "color", name: "Kleur", type: TableType.string },
    { id: "brand", name: "Merk", type: TableType.string },
    { id: "model", name: "Model", type: TableType.string },
    { id: "buyDate", name: "Inkoopdatum", type: TableType.date },
    { id: "dayPrice", name: "Dagprijs", type: TableType.int },
    { id: "weekendPrice", name: "Weekend-prijs", type: TableType.int },
    { id: "weekPrice", name: "Weekprijs", type: TableType.int },
    { id: "monthPrice", name: "Maandprijs", type: TableType.int }
];

export default function ManageBikes() {
    const [tableContent, setTableContent] = useState<{ id: number, data: any[] }[]>([]);

    useEffect(() => {
        async function getBikes() {
            axios.get(`${process.env.REACT_APP_URL}/api/bikes`, {
                params: {
                    credentials: {
                        username: sessionStorage.getItem('username'),
                        token: sessionStorage.getItem('token')
                    }
                }
            })
                .then((res) => {
                    const data: Bike[] = res.data.map((x: Bike) => Object.assign({}, x, {
                        type: typeTranslation[x.type]
                    }));;
                    let tableContent: { id: number, data: any[] }[] = [];

                    for (let i = 0; i < data.length; i++) {
                        const item = data[i];
                        tableContent.push({
                            id: item.id, data: [
                                item.image, item.type, item.size, item.color, item.brand, item.model, item.buyDate, item.dayPrice, item.weekendPrice, item.weekPrice, item.monthPrice
                            ]
                        });
                    }
                    setTableContent(tableContent);
                })
                .catch(error => console.error(`Error: ${error}`));
        }
        getBikes();
    }, []);

    type Bike = {
        id: number,
        image: string,
        type: string,
        size: number,
        color: string,
        brand: string,
        model: string,
        buyDate: object,
        dayPrice: number,
        weekendPrice: number,
        weekPrice: number,
        monthPrice: number
    };

    return (
        <div className="manageBikes field">
            <EditableTable columns={tableColumns} content={tableContent} />
        </div>
    )
}
