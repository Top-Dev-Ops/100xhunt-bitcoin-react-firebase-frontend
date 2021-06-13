import React, { useState, useEffect } from 'react'

export default function Simple() {
    const [value, setValue] = useState(0);
    let change = false;

    const handle = () => {
        setValue(value + 1);
        change = !change;
    }

    useEffect(() => {

    });

    document.title = value + ' ';
    console.log('change: ', change);

    const handleChange = e => {
        setValue(e.target.value);
    }

    return (
        <>
            <button onClick={handle}>click me</button>
            <input type="text" value={value} onChange={handleChange} />
        </>
    )
}
