import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { BiWater } from 'react-icons/bi';
import { RiPlantFill } from 'react-icons/ri';
import { FaTemperatureLow } from 'react-icons/fa';
import { GiPoisonGas } from 'react-icons/gi';
import './style.css';

const iconDecider = (icon) => {
    switch (icon) {
        case 'humidity':
            return <BiWater className='textIcon' color='#16b8f7' />;
        case 'moisture':
            return <RiPlantFill className='textIcon' color='#d7c289' />;
        case 'temperature':
            return <FaTemperatureLow className='textIcon' color='#ffa6a6' />;
        case 'smoke':
            return <GiPoisonGas className='textIcon' color='#f5d167' />;
        default:
            <> </>;
    }
};
const innerTextDecider = (innerText) => {
    if (!!innerText) {
        return innerText;
    } else {
        return ""
    }
}
const Dashboard = ({ value, innerText, progressBarText, icon, maxValue = 100, minValue = 0 }) => {

    return (
        <div className='dashboardItem'>
            <div style={{ width: '250px' }}>
                <CircularProgressbar
                    maxValue={maxValue}
                    minValue={minValue}
                    value={value ? value : 0}
                    text={innerTextDecider(innerText)}
                    background
                    styles={buildStyles({
                        backgroundColor: '#094067',
                        textColor: '#ef4565',
                        pathColor: '#ef4565',
                        pathTransitionDuration: 1,
                        trailColor: '#fffffe',
                    })}
                />
            </div>
            <div>
                <h2 className='progressBarText'>
                    {progressBarText}
                    <div>{iconDecider(icon)}</div>
                </h2>
            </div>
        </div>
    );
};

export default Dashboard;
