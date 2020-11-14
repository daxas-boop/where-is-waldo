export interface ILevels {
  getCharacters: () => string[];
  getImage: () => File;
  isLevelOver: () => void;
  characterLeft: () => void;
  getName: () => string;
}
