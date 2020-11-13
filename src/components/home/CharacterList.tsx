import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  width: 100px;
  font-family: 'Roboto';
  margin-left: 80px;
  z-index: 2;
  border-radius: 5px;
  &:hover {
    cursor: default;
  }
`;

const Character = styled.p`
  color: white;
  text-align: center;
  background-color: black;
  opacity: 1;
  &:hover {
    background-color: red;
    cursor: pointer;
  }
`;

export default function CharacterList() {
  return (
    <Container>
      <Character>Waldo</Character>
    </Container>
  );
}
