import { ILevels } from '../types/level-types';
import Level from './Level';
import level1_img from '../assets/images/level_1.png';

const level_1 = new Level(['waldo', 'falling woman'], level1_img, 'Level 1');

export const levels: { [key: string]: ILevels } = {
  level_1,
};
