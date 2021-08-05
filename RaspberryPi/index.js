const rpio = require('rpio');
const sensor = require("node-dht-sensor");
const firebase = require('firebase');
const firebaseConfig = require('./firebaseConfig');
const { DHT11, SMOKE_SENSOR, PUMP_RELAY, MOISTURE_SENSOR } = require('./constants');

console.log('Setting up in progress....');

try {
    firebase.initializeApp(firebaseConfig)
    console.log("Firebase initialized sucessfully")
} catch (error) {
    console.log(error)
}

let data = {
    temperature: 0,
    humidity: 0,
    isSmokeDetected: false,
    moisture: true,
    isPumpOn: false,
}

const setUp=()=>{
    rpio.open(SMOKE_SENSOR, rpio.INPUT);
    rpio.open(MOISTURE_SENSOR, rpio.INPUT);
    rpio.open(PUMP_RELAY, rpio.OUTPUT,rpio.HIGH)
}
setUp()

const setData = (readings) => {
    console.log(readings)
    data = { ...data, ...readings }
}

const getTemperatureHumidity = () => {
    sensor.read(11, DHT11, function (err, temperature, humidity) {
        if (!err) {
            setData({ temperature, humidity });
        } else {
            setData({ temperature: 0, humidity: 0 });
        }
    });
}

const setSmokeSensorReading = () => {
    let isSmokeDetected = rpio.read(SMOKE_SENSOR)
    isSmokeDetected= !isSmokeDetected;
    setData({ isSmokeDetected });
    
}

const setMoistureReading = () => {
    let moisture = rpio.read(MOISTURE_SENSOR)
    moisture = !moisture;
    setData({ moisture });
}

const waterPlant = () => {
    if (data.moisture) {
        rpio.write(PUMP_RELAY, rpio.HIGH);
        setData({ isPumpOn: false });
    } else {
        rpio.write(PUMP_RELAY, rpio.LOW);
        setData({ isPumpOn: true });
    }
}

const writeData = () => {
    try {
        firebase.firestore().collection('user').doc('pavan').set({
            temperature: data.temperature,
            humidity: data.humidity,
            isSmokeDetected: data.isSmokeDetected,
            moisture: data.moisture,
            isPumpOn: data.isPumpOn,
        })
    } catch (error) {
        console.error('Error writing data to database', error);
    }
}

setInterval(() => {
    getTemperatureHumidity();
    setMoistureReading();
    setSmokeSensorReading();
    waterPlant();
    writeData();
}, 3000)

console.log('Setting up completed....');

