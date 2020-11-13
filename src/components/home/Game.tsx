import React, { useState } from 'react';
import CharacterList from './CharacterList';
import styled from '@emotion/styled';
import level1 from '../../assets/images/level_1.png';

const Container = styled.section`
  height: 100vh;
  width: 80vw;
  margin: 0 auto;
  position: relative;
  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const Grid = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  grid-template-rows: repeat(15, 1fr);
`;

const Cell = styled.div`
  position: relative;
  &:hover {
    cursor: pointer;
  }
`;

const BorderBox = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid black;
`;

const Game = () => {
  const COORDINATES = Array.apply(null, Array(225));
  const [renderCharList, setRenderCharList] = useState(
    new Array(225).fill(false)
  );

  const handleCellClick = (i: number) => {
    const newRenderCharList = new Array(225).fill(false);
    newRenderCharList.splice(i, 1, true);
    setRenderCharList(newRenderCharList);
  };

  return (
    <Container>
      <Grid>
        {COORDINATES.map((e, i) => (
          <Cell key={i} onClick={(e) => handleCellClick(i)}>
            {renderCharList[i] ? (
              <>
                <BorderBox />
                <CharacterList />
              </>
            ) : null}
          </Cell>
        ))}
      </Grid>
      <Image src={level1} alt="image of wheres is waldo" />
    </Container>
  );
};

export default Game;
