import firebase from 'firebase';
import * as firebaseConfig from '../firebaseConfig';

firebase.initializeApp(firebaseConfig);
// moke response
// setInterval(() => {
//     try {
//         firebase
//             .firestore()
//             .collection('user')
//             .doc('pavan')
//             .set({
//                 connected: true,
//                 temperature: Math.floor(Math.random() * 100),
//                 humidity: Math.floor(Math.random() * 100),
//                 isSmokeDetected: false,
//                 moisture: Math.floor(Math.random() * 100),
//                 isPumpOn: false,
//             });
//     } catch (error) {
//         console.error('Error writing data to database', error);
//     }
// }, 5000);

export default firebase.firestore();
