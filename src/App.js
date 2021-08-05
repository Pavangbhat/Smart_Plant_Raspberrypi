import { useEffect, useState } from 'react';
import './style.css';
import DB from './Firebase/index';
import PlantStatus from './components/plantStatus';
import DashboardItem from './components/dashboard';
import { HUMI_MAX, HUMI_MIN, TEMP_MAX, TEMP_MIN } from './constants/constants';

const plantStatusDecider = ({
  moisture = false,
  humidity = 0,
  temperature = 0,
  isSmokeDetected = false,
}) => {
  console.log(moisture, humidity, temperature, isSmokeDetected)
  if (
    moisture &&
    humidity <= HUMI_MAX &&
    humidity >= HUMI_MIN &&
    temperature <= TEMP_MAX &&
    temperature > TEMP_MIN &&
    !isSmokeDetected
  ) {
    return 'Feeling Awesome';
  } else if (isSmokeDetected) {
    return 'Hard To Breath, Hopefully I Dont Get Burned Up';
  } else if (!moisture) {
    return 'I Need Some Water!';
  } else if (temperature > 30) {
    return 'Its Hot In Here Must Be Summer';
  } else if (temperature && temperature < 15) {
    return 'Feeling Really Cold';
  } else if (humidity && humidity > 95) {
    return 'Looks Like There Is High Humidity';
  } else if (humidity && humidity < 60) {
    return 'Looks Like There Is Low Humidity';
  }
};

function App() {
  const [data, setData] = useState({
    moisture: false,
    humidity: 0,
    temperature: 0,
    isSmokeDetected: false
  });

  useEffect(() => {
    (async () => {
      try {
        const usersRef = await DB.collection('user').doc('pavan');
        usersRef.onSnapshot((snapshot) => {
          const values = snapshot.data();
          if (values) {
            setData(values);
          }
        });
      } catch (error) {
        console.log('error', error);
      }
    })();
  }, []);

  const { moisture, humidity, temperature, isSmokeDetected, isPumpOn } = data;

  return (
    <div className='container'>
      <PlantStatus status={plantStatusDecider({ moisture, humidity, temperature, isSmokeDetected })} />
      <div className='dashBoardContainer'>
        <div className='dashBoardItems'>
          <DashboardItem
            icon={'moisture'}
            value={moisture ? 100 : 0}
            innerText={moisture ? 'Wet' : 'Dry'}
            progressBarText={'Soli Moisture'}
          />
          <DashboardItem
            icon={'humidity'}
            value={humidity}
            maxValue={HUMI_MAX}
            minValue={HUMI_MIN}
            innerText={humidity && `~${humidity}%`}
            progressBarText={'Humidity'}
          />
          <DashboardItem
            icon={'temperature'}
            value={temperature}
            maxValue={TEMP_MAX}
            minValue={TEMP_MIN}
            innerText={temperature && `~${temperature} C`}
            progressBarText={'Temperature'}
          />
          <DashboardItem
            icon={'smoke'}
            value={isSmokeDetected ? 100 : 0}
            innerText={isSmokeDetected ? 'Danger' : 'Nope'}
            progressBarText={'Flammable Gas'}
          />
          <DashboardItem
            icon={''}
            value={isPumpOn ? 100 : 0}
            innerText={isPumpOn ? 'On' : 'Off'}
            progressBarText={'Pump Status'}
          />
        </div>
        <div>
          <h1 className='dashboardText'>Dashboard</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
