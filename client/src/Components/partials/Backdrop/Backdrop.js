import React from 'react';
import './Backdrop.css';

const Backdrop = ({show, closeSidedrawer}) => {

    let displayOutput = null;
    if (true) {
        displayOutput = (
            <div onClick={closeSidedrawer} className="Backdrop">

            </div>
        )
    } 

    return displayOutput;
}

export default Backdrop;