import React from 'react';
import './style.css';
import plantIllustration from '../../graphics/images/plant.png';
import smallPlant from '../../graphics/images/smallPlant.svg';

const PlantStatus = ({ status }) => {
    return (
        <div className='statusContainer'>
            <div className='plantStatusWrapper'>
                <h1 className='plantStatusHeading'>Plant Status</h1>
                <img src={smallPlant} salt='plant' className='smallPlant' alt='plant' />
                <h3>{status}</h3>
            </div>
            <div>
                <img
                    src={plantIllustration}
                    salt='plant'
                    className='plantIllustration'
                    alt='plant'
                />
            </div>
        </div >
    );
};

export default PlantStatus;
