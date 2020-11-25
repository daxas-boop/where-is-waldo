import firebase from '../../../config/fbConfig';
import 'firebase/firestore';

let startedTime: number | undefined;
let endedTime: number | undefined;

export const startTimer = () => {
  console.log('timer started');
  startedTime = firebase.firestore.Timestamp.now().toMillis();
};

export const endTimer = () => {
  console.log('timer ended');
  endedTime = firebase.firestore.Timestamp.now().toMillis();
};

export const getTimeDifferential = () => {
  const difference = endedTime! - startedTime!;
  const secondDiff = Math.abs(difference / 1000);
  const seconds = Math.floor(secondDiff % 60);
  const minutes = Math.floor(secondDiff / 60) % 24;
  return `${pad(minutes)}:${pad(seconds)}`;
};

const pad = (value: number) => {
  if (value < 10) {
    return ('0' + value).toString();
  } else {
    return value;
  }
};
