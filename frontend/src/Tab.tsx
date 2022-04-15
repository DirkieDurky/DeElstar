import React from 'react'

export default function Tab(props: { text: string }) {
    const { text } = props;
    return (
        <div className="tab">
            {/* <img src={img} alt={imgAlt} /> */}
            <span className="tabText">{text}</span>
        </div>
    )
}