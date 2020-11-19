import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Button from '@material-ui/core/Button';
import { keyframes } from '@emotion/core';
import { isCharacterFound } from './helpers/helpers';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

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

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  pointer-events: none;
`;

const Game = (props: any) => {
  const { level } = props;
  const [selectorBoxCoords, setSelectorBoxCoords] = useState<Array<number>>([]);
  const [showSelectorBox, setShowSelectorBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finishedLevel, setFinishedLevel] = useState(false);
  const [charactersFound, setCharactersFound] = useState<Array<string>>([]);
  const [charactersNotFound, setCharactersNotFound] = useState<Array<string>>(
    level.characters
  );

  useEffect(() => {
    setFinishedLevel(charactersNotFound.length === 0);
  }, [charactersNotFound]);

  const restartLevel = () => {
    setCharactersFound([]);
    setCharactersNotFound(level.characters);
  };

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
      const newNotFoundCharacters = charactersNotFound.filter(
        (char: string) => char !== character
      );
      setCharactersNotFound(newNotFoundCharacters);
      setCharactersFound([...charactersFound, character]);
    }
  };

  if (finishedLevel)
    return (
      <>
        <Typography color="primary" variant="h2" align="center">
          {`You beat ${level.name}`}
        </Typography>
        <Typography color="primary" variant="h3" align="center">
          Your time was:
        </Typography>
        <Link to="/levels">
          <Button variant="contained">Select a new Level</Button>
        </Link>
        <Button
          onClick={() => {
            restartLevel();
          }}
          variant="contained"
        >
          Play again?
        </Button>
      </>
    );

  return (
    <>
      <Typography variant="h3" align="center">
        {level.name}
      </Typography>
      <Container>
        <Image
          src={level.image}
          onClick={(e) => handleImageClick(e)}
          alt={`Image of ${level.name}`}
        />
        {showSelectorBox && (
          <Wrapper
            style={{
              left: selectorBoxCoords[0] - 25,
              top: selectorBoxCoords[1] - 25,
            }}
          >
            <SelectorBox />
            {charactersNotFound.map((character: string) => (
              <StyledButton
                key={character}
                variant="contained"
                onClick={() =>
                  handleCharacterClick(character, selectorBoxCoords)
                }
              >
                {character}
              </StyledButton>
            ))}
          </Wrapper>
        )}

        {loading && (
          <LoadingSelector
            style={{
              left: selectorBoxCoords[0] - 25,
              top: selectorBoxCoords[1] - 25,
            }}
          />
        )}
      </Container>
    </>
  );
};

export default Game;
