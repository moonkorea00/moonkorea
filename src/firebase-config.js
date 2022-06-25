import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore';

// import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_APP_ID,
  // measurementId: process.env.REACT_APP_MEASUREMENT_ID,

  apiKey: "AIzaSyAZpv4WF2FK0nYVnGEbaEzZv9gJwQUH6YI",
  authDomain: "github-io-dev.firebaseapp.com",
  projectId: "github-io-dev",
  storageBucket: "github-io-dev.appspot.com",
  messagingSenderId: "553203263177",
  appId: "1:553203263177:web:9e815b3e773c011d7dcf18",
  measurementId: "G-P7ZNYE5ZW4"

//   REACT_APP_API_KEY="AIzaSyAZpv4WF2FK0nYVnGEbaEzZv9gJwQUH6YI"
// REACT_APP_AUTH_DOMAIN="github-io-dev.firebaseapp.com"
// REACT_APP_PROJECT_ID="github-io-dev",
// REACT_APP_STORAGE_BUCKET="github-io-dev.appspot.com",
// REACT_APP_MESSAGING_SENDER_ID="553203263177",
// REACT_APP_APP_ID="1:553203263177:web:9e815b3e773c011d7dcf18",
// REACT_APP_MEASUREMENT_ID="G-P7ZNYE5ZW4",

};
const app = initializeApp(firebaseConfig);
// const firestoreDB = initializeFirestore(firebaseConfig, {
//   experimentalForceLongPolling: true, // this line
//   useFetchStreams: false, // add this line
// });
export const db = getFirestore(app);


// 이게 app이고
// const firebaseApp = firebase.initializeApp({
//   apiKey: "...",
//   authDomain: "...",
//   ....
// });

// 이게 db
// const db = firebaseApp.firestore();

// export default db;

