import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Button from '@material-ui/core/Button';
import { keyframes } from '@emotion/core';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
  isCharacterFound,
  saveTimeInLeaderboard,
} from './helpers/helper-functions';
import {
  startTimer,
  endTimer,
  getTimeDifferential,
} from './helpers/time-helpers';

const Container = styled.section`
  width: 1280px;
  position: relative;
  margin: 60px auto;
  overflow-y: hidden;
  overflow-x: auto;
  max-width: 95%;
`;

const Image = styled.img`
  width: 1280px;
  height: 720px;
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

type CoordsProps = {
  coords: Array<number>;
};

const LoadingSelector = styled.div<CoordsProps>`
  position: absolute;
  border: 10px solid #f3f3f3;
  border-top: 10px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 2s linear infinite;
  left: ${(props) => (props.coords[0] - 25).toString() + 'px'};
  top: ${(props) => (props.coords[1] - 25).toString() + 'px'};
`;

const Wrapper = styled.div<CoordsProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  left: ${(props) => (props.coords[0] - 25).toString() + 'px'};
  top: ${(props) => (props.coords[1] - 25).toString() + 'px'};
`;

const FoundCircle = styled.div<CoordsProps>`
  position: absolute;
  left: ${(props) => (props.coords[0] - 25).toString() + 'px'};
  top: ${(props) => (props.coords[1] - 25).toString() + 'px'};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid darkgreen;
`;

const CenterButtons = styled.div`
  display: flex;
  justify-content: center;
  text-decoration: none;
  margin-top: 20px;
`;

const FinishedLevelContainer = styled.div`
  margin-top: 50px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin-right: 20px;
`;

const Game = (props: any) => {
  const { level } = props;
  const [selectorBoxCoords, setSelectorBoxCoords] = useState<Array<number>>([]);
  const [showSelectorBox, setShowSelectorBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLevelOver, setIsLevelOver] = useState(false);
  const [charactersFound, setCharactersFound] = useState<any>([]);
  const [charactersNotFound, setCharactersNotFound] = useState<Array<string>>(
    level.characters
  );

  useEffect(() => {
    if (!isLevelOver) {
      startTimer();
    }
  }, [isLevelOver]);

  useEffect(() => {
    if (charactersNotFound.length === 0) {
      endTimer();
      saveTimeInLeaderboard(getTimeDifferential(), level);
    }
    setIsLevelOver(charactersNotFound.length === 0);
  }, [charactersNotFound, level]);

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
      setCharactersFound([...charactersFound, { character, coordinates }]);
    }
  };

  if (isLevelOver)
    return (
      <FinishedLevelContainer>
        <Typography gutterBottom variant="h1" align="center">
          {`You beat ${level.name}`}
        </Typography>
        <Typography gutterBottom color="primary" variant="h3" align="center">
          Your time was {getTimeDifferential()}
        </Typography>
        <CenterButtons>
          <StyledLink to="/levels">
            <Button variant="contained">Select a new Level</Button>
          </StyledLink>
          <Button onClick={() => restartLevel()} variant="contained">
            Play again?
          </Button>
        </CenterButtons>
      </FinishedLevelContainer>
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

        {charactersFound.map(
          (character: { character: string; coordinates: Array<number> }) => (
            <FoundCircle
              key={character.character}
              coords={character.coordinates}
            ></FoundCircle>
          )
        )}

        {showSelectorBox && (
          <Wrapper coords={selectorBoxCoords}>
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

        {loading && <LoadingSelector coords={selectorBoxCoords} />}
      </Container>
    </>
  );
};

export default Game;
