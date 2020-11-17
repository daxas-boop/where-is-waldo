import React, { useState } from 'react';
import styled from '@emotion/styled';
import Button from '@material-ui/core/Button';
import { isCharacterFound } from './helpers/helpers';
import { CollectionsBookmark } from '@material-ui/icons';

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

const Game = (props: any) => {
  const [selectorBoxCoords, setSelectorBoxCoords] = useState<Array<number>>([]);
  const [showSelectorBox, setShowSelectorBox] = useState(false);

  const handleImageClick = (e: React.MouseEvent<HTMLElement>) => {
    const coords = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];
    setSelectorBoxCoords(coords);
    setShowSelectorBox(true);
  };

  const handleCharacterClick = async (character: string) => {
    const isFound = await isCharacterFound(
      character,
      props.level,
      selectorBoxCoords
    );
    // show loading response
    // encircle the character if found // save matching characters
    // show error if missed
    setShowSelectorBox(false);
  };

  const { level } = props;
  return (
    <Container id="container">
      <Image
        src={level.getImage()}
        onClick={(e) => handleImageClick(e)}
        alt="image of wheres is waldo"
      />
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
          {level.getCharacters().map((character: string) => (
            <StyledButton
              key={character}
              variant="contained"
              onClick={() => handleCharacterClick(character)}
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
