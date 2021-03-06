import React from 'react'

export default function Card(props: { img: any, text: string, light: boolean }) {
    const { img, text, light } = props;
    return (
        <div className={`card${light ? " light" : ""}`}>
            <div className="imageBox">
                <div className="imageHelper">
                    <img className="image" src={`data:image/jpeg;base64,${img}`} alt="fiets" />
                </div>
            </div>
            <span className="text">{text}</span>
        </div >
    )
}