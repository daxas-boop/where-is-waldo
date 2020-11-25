import React, { useState, useEffect } from 'react';
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
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Button } from '@material-ui/core';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

const useStyles = makeStyles({
  title: {
    color: 'white',
    margin: '10px',
  },
  image: {
    width: '1280px',
    height: '720px',
  },
  listButton: {
    pointerEvents: 'auto',
    width: '150px',
  },
  box: {
    display: 'flex',
    justifyContent: 'center',
  },
  textItems: {
    margin: '0px 7px',
    color: 'white',
  },
});

const ImageContainer = styled.div`
  width: 1280px;
  position: relative;
  overflow-y: hidden;
  overflow-x: auto;
  max-width: 95%;
  padding: 0;
  margin: 22px auto;
`;

const Circle = styled.div`
  width: 50px;
  height: 50px;
  border: 2px dashed black;
  border-radius: 50%;
  position: absolute;
  pointer-events: none;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

type CoordsProps = {
  coords: Array<number>;
};

const LoadingCircle = styled.div<CoordsProps>`
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
  border: 5px solid black;
`;

const ButtonContainer = styled.div`
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

const ButtonList = styled.div<CoordsProps>`
  display: flex;
  flex-direction: column;
  margin-left: ${(props) => (props.coords[0] < 640 ? '60px' : '-160px')};
  margin-top: ${(props) =>
    props.coords[1] > 620 ? '-100px' : props.coords[1] < 20 ? '20px' : '0px'};
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
  const classes = useStyles(props);

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
    console.log(coords);
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
        <Typography
          className={classes.title}
          gutterBottom
          variant="h1"
          align="center"
        >
          {`You beat ${level.name}`}
        </Typography>
        <Typography gutterBottom color="primary" variant="h3" align="center">
          Your time was {getTimeDifferential()}
        </Typography>
        <ButtonContainer>
          <StyledLink to="/levels">
            <Button variant="contained">Select a new Level</Button>
          </StyledLink>
          <Button onClick={() => restartLevel()} variant="contained">
            Play again?
          </Button>
        </ButtonContainer>
      </FinishedLevelContainer>
    );

  return (
    <>
      <Typography className={classes.title} variant="h2" align="center">
        {level.name}
      </Typography>
      <Typography className={classes.title} variant="h5" align="center">
        Find the following characters in the shortest time possible:
      </Typography>
      <Box className={classes.box}>
        {charactersNotFound.map((character) => (
          <Typography
            key={character}
            className={classes.textItems}
            variant="h6"
            align="center"
          >
            {character[0].toUpperCase() + character.slice(1)}
          </Typography>
        ))}
      </Box>
      <ImageContainer>
        <img
          className={classes.image}
          src={level.image}
          onClick={(e) => handleImageClick(e)}
          alt={`${level.name}`}
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
            <Circle />
            <ButtonList coords={selectorBoxCoords}>
              {charactersNotFound.map((character: string) => (
                <Button
                  className={classes.listButton}
                  key={character}
                  variant="contained"
                  onClick={() =>
                    handleCharacterClick(character, selectorBoxCoords)
                  }
                >
                  {character}
                </Button>
              ))}
            </ButtonList>
          </Wrapper>
        )}

        {loading && <LoadingCircle coords={selectorBoxCoords} />}
      </ImageContainer>
    </>
  );
};

export default Game;
