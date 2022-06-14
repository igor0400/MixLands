import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, child, get } from 'firebase/database';

const firebaseConfig = {
   apiKey: 'AIzaSyAvnlJ_k-MkPx0rflE_KZevQ9ddhXubGIk',
   authDomain: 'mixlands-8fd5a.firebaseapp.com',
   databaseURL: 'https://mixlands-8fd5a-default-rtdb.firebaseio.com',
   projectId: 'mixlands-8fd5a',
   storageBucket: 'mixlands-8fd5a.appspot.com',
   messagingSenderId: '273559638708',
   appId: '1:273559638708:web:e931b9b77f3b98bd40fde1',
   measurementId: 'G-EQKD2FB2BQ',
};

const dbLink = 'https://mixlands-8fd5a-default-rtdb.firebaseio.com';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set, child, get, dbLink };
