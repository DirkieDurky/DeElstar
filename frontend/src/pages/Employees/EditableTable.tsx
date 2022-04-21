import React from 'react'

export enum TableType {
    string,
    int,
    image,
    enum,
    boolean,
    date
}

export default function EditableTable(props: { columns: { name: string, type: TableType }[], content: any[][] }) {
    const { columns, content } = props;
    let headers = [];
    for (let i = 0; i < columns.length; i++) {
        headers.push(<th key={i}>{columns[i].name}</th>);
    }
    headers.push(<th></th>);
    let rows = [];
    for (let i = 0; i < content.length; i++) {
        let row = [];
        for (let j = 0; j < content[i].length; j++) {
            switch (columns[j].type) {
                case TableType.string | TableType.int:
                    {
                        row.push(<td key={i * j} contentEditable="true">{content[i][j]}</td>)
                        break;
                    }
                default:
                    {
                        row.push(<td key={i * j}></td>)
                    }
            }
        }
        row.push(<td key={i}><span className="tableRemove"> </span></td>)
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
