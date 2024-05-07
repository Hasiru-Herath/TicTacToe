import React from 'react';
import './Square.css';

const Square = ({ val, chooseSquare }) => {
    return (
        <div className="square" onClick={chooseSquare}>
            {val}
        </div>
    );
};

export default Square;
