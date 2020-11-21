import { ILevels } from '../../../types/level-types';
import firebase from '../../../config/fbConfig';
import 'firebase/firestore';

export const isCharacterFound = async (
  character: string,
  level: ILevels,
  selectedCoords: Array<number>
) => {
  const db = firebase.firestore();
  const docLevel = db.collection('levels').doc(level.name);
  const selectedCoordX = selectedCoords[0];
  const selectedCoordY = selectedCoords[1];
  let error: string = '';
  let isFound: boolean = false;

  await docLevel.get().then((levelData: any) => {
    if (levelData.exists) {
      const characterCoords = levelData.data().characters[character];
      isFound =
        selectedCoordX >= characterCoords.coords_x[0] &&
        selectedCoordX <= characterCoords.coords_x[1] &&
        selectedCoordY >= characterCoords.coords_y[0] &&
        selectedCoordY <= characterCoords.coords_y[1];
    } else {
      error = 'Document not found';
    }
  });

  if (error) {
    return error;
  }

  return isFound;
};

export const saveTimeInLeaderboard = async (time: string, level: ILevels) => {
  const db = firebase.firestore();
  const userUid = firebase.auth().currentUser!.uid;
  const docRef = db.collection('users').doc(userUid);

  const doc = await docRef.get();
  try {
    if (doc.exists) {
      const userName = doc.data()!.username;
      db.collection('leadeboard').doc(level.name).set({
        userName,
        time,
      });
    } else {
      console.log('No such document');
    }
  } catch (error) {
    console.log('Error getting document:', error);
  }
};
