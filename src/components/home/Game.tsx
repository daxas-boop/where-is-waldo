import React, { useState } from 'react';
import styled from '@emotion/styled';
import Button from '@material-ui/core/Button';
import { keyframes } from '@emotion/core';
import { isCharacterFound } from './helpers/helpers';
import levelReducer from '../../store/reducers/levelReducer';

const Container = styled.section`
  width: 1024px;
  position: relative;
  margin: 60px auto;
  overflow-y: hidden;
  overflow-x: auto;
  max-width: 100%;

  @media (max-width: 768px) {
    width: 720px;
  }
`;

const Image = styled.img`
  width: 1024px;
  height: 900px;

  @media (max-width: 768px) {
    width: 720px;
    height: 425px;
  }
`;

const SelectorBox = styled.div`
  width: 50px;
  height: 50px;
  border: 2px dashed black;
  border-radius: 50%;
  position: absolute;
  pointer-events: none;
`;

const StyledButton = styled(Button)`
  margin-left: 60px;
  pointer-events: auto;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingSelector = styled.div`
  position: absolute;
  border: 10px solid #f3f3f3;
  border-top: 10px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 2s linear infinite;
`;

const Game = (props: any) => {
  const [selectorBoxCoords, setSelectorBoxCoords] = useState<Array<number>>([]);
  const [showSelectorBox, setShowSelectorBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finishedLevel, setFinishedLevel] = useState(false);
  const { level } = props;

  const handleImageClick = (e: React.MouseEvent<HTMLElement>) => {
    const coords = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];
    setSelectorBoxCoords(coords);
    setShowSelectorBox(true);
  };

  const handleCharacterClick = async (
    character: string,
    coordinates: Array<number>
  ) => {
    setLoading(true);
    setShowSelectorBox(false);
    const isFound = await isCharacterFound(character, level, coordinates);
    setLoading(false);

    if (isFound) {
      const newNotFoundCharacters = level.charactersNotFound.filter(
        (char: string) => char !== character
      );
      level.charactersNotFound = newNotFoundCharacters;
      level.charactersFound.push(character);
      level.charactersNotFound.length === 0 && setFinishedLevel(true);
    }
  };

  return (
    <Container id="container">
      {finishedLevel && <h1>YOU WIN</h1>}
      <Image
        src={level.image}
        onClick={(e) => handleImageClick(e)}
        alt="image of wheres is waldo"
      />
      {loading && (
        <LoadingSelector
          style={{
            left: selectorBoxCoords[0] - 25,
            top: selectorBoxCoords[1] - 25,
          }}
        />
      )}
      {showSelectorBox && (
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            left: selectorBoxCoords[0] - 25,
            top: selectorBoxCoords[1] - 25,
            pointerEvents: 'none',
          }}
        >
          <SelectorBox />
          {level.charactersNotFound.map((character: string) => (
            <StyledButton
              key={character}
              variant="contained"
              onClick={() => handleCharacterClick(character, selectorBoxCoords)}
            >
              {character}
            </StyledButton>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Game;
