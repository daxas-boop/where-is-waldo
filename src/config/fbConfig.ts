import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAY76zZT3VJZdf-0wyCnVJP6C_UAycfDmY',
  authDomain: 'where-s-waldo-51820.firebaseapp.com',
  databaseURL: 'https://where-s-waldo-51820.firebaseio.com',
  projectId: 'where-s-waldo-51820',
  storageBucket: 'where-s-waldo-51820.appspot.com',
  messagingSenderId: '1023701944897',
  appId: '1:1023701944897:web:c8e527f6635d67993cd4c0',
  measurementId: 'G-QZ1C22GTHL',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
