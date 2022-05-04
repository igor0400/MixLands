import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBSQS4Dyaq3GRcdc14wu7104xWdI7aLYCY',
  authDomain: 'mixlands-3696a.firebaseapp.com',
  databaseURL: 'https://mixlands-3696a-default-rtdb.firebaseio.com',
  projectId: 'mixlands-3696a',
  storageBucket: 'mixlands-3696a.appspot.com',
  messagingSenderId: '750489906074',
  appId: '1:750489906074:web:b5af2b0694dbfcf7666823',
  measurementId: 'G-2250PVDBS2',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set };
