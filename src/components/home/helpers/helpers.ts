import { ILevels } from '../../../types/level-types';
import firebase from '../../../config/fbConfig';
import 'firebase/firestore';

export const isCharacterFound = async (
  character: string,
  level: ILevels,
  selectedCoords: Array<number>
) => {
  const db = firebase.firestore();
  console.log(level);
  const docLevel = db.collection('levels').doc(level.name);
  const selectedCoordX = selectedCoords[0];
  const selectedCoordY = selectedCoords[1];
  let error: string = '';
  let isFound: boolean = false;

  await docLevel.get().then((levelData: any) => {
    if (levelData.exists) {
      const characterCoords =
        window.innerWidth <= 768
          ? levelData.data().characters[character].mobile
          : levelData.data().characters[character].desktop;
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
