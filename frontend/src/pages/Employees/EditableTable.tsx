import axios from 'axios';
import { join } from 'path/posix';
import React from 'react'

export enum TableType {
    string,
    int,
    image,
    enum,
    boolean,
    date,
    deleteButton
}

export default function EditableTable(props: { columns: { id: string, name: string, type: TableType, options?: string[] }[], content: { id: number, data: any[] }[] }) {
    const { columns, content } = props;
    let headers = [];
    for (let i = 0; i < columns.length; i++) {
        headers.push(<th key={i}>{columns[i].name}</th>);
    }
    headers.push(<th key={columns.length}></th>);
    let rows = [];
    for (let i = 0; i < content.length; i++) {
        let row = [];
        for (let j = 0; j < content[i].data.length; j++) {
            switch (columns[j].type) {
                case TableType.string:
                    {
                        row.push(<td key={j} className="tableCell"><input className="tableInput" type="text" name={columns[j].name} defaultValue={content[i].data[j]} /></td>);
                        break;
                    }
                case TableType.int:
                    {
                        row.push(<td key={j} className="tableCell"><input className="tableInput" type="number" name={columns[j].name} defaultValue={content[i].data[j]} /></td>);
                        break;
                    }
                case TableType.enum:
                    {
                        let options = columns[j].options!.map((option, index) => <option defaultValue={option} key={index}>{option}</option>);
                        row.push(<td key={j} className="tableCell">
                            <select className="tableInput" name={columns[j].name} id={content[i].data[j]} defaultValue={content[i].data[j]}
                                onChange={async (event) => {
                                    console.log("Change detected!");
                                    await axios.post(`${process.env.REACT_APP_URL}/api/updateBike`, {
                                        credentials: { username: localStorage.getItem("username"), token: localStorage.getItem("token") },
                                        bikeId: content[i].id,
                                        column: columns[j].id,
                                        value: event.target
                                    })
                                }}>
                                {options}
                            </select>
                        </td>)
                        break;
                    }
                case TableType.date:
                    {
                        row.push(<td key={j} className="tableCell tableDateCell"><input className="tableInput" type="datetime-local" name={columns[j].name} defaultValue={content[i].data[j].replace('Z', '')} ></input></td>);
                        break;
                    }
                case TableType.image:
                    {
                        row.push(<td key={j} className="tableCell"><img className="tableImage" src={`data:image/jpeg;base64,${content[i].data[j]}`} alt="fiets" /></td>);
                    }
            }
        }
        row.push(<td key={content[i].data.length} className="tableDeleteButton"></td>)
        rows.push(<tr key={i}>{row}</tr>);
    }
    return (
        <table>
            <thead>
                <tr>
                    {headers}
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}
