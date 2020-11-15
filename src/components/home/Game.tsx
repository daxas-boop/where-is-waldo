import React, { useState } from 'react';
import styled from '@emotion/styled';
import Button from '@material-ui/core/Button';
import firebase from '../../config/fbConfig';
import 'firebase/firestore';

const Container = styled.section`
  height: 100vh;
  width: 80vw;
  margin: 60px auto;
  overflow: hidden;
  position: relative;
  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const SelectorBox = styled.div`
  width: 100px;
  height: 100px;
  border: 2px dashed black;
  border-radius: 50%;
  position: absolute;
  pointer-events: none;
`;

const StyledButton = styled(Button)`
  margin-left: 110px;
`;

const Game = (props: any) => {
  const [selectorBoxCoords, setSelectorBoxCoords] = useState<Array<number>>([]);
  const [showSelectorBox, setShowSelectorBox] = useState(false);
  const db = firebase.firestore();

  const handleImageClick = (e: React.MouseEvent<HTMLElement>) => {
    const coords: Array<number> = [
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY,
    ];
    setSelectorBoxCoords(coords);
    setShowSelectorBox(true);
  };

  const handleCharacterClick = (character: string) => {
    const docLevel = db.collection('levels').doc(props.level.getName());
    docLevel.get().then((level: any) => {
      if (level.exists) {
        //matchear character
        //chekear coords
        console.log(level.data().characters);
      } else {
        console.log('No such document!');
      }
    });
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
            left: selectorBoxCoords[0] - 50,
            top: selectorBoxCoords[1] - 50,
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
