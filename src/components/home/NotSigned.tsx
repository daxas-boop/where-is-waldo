import React from 'react';
import styled from '@emotion/styled';
import SignUp from '../navbar/SignUp';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Roboto;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin: 0;
  padding: 0;
  align-self: center;
`;

const Text = styled.h2`
  text-align: center;
  margin-top: 50px;
  margin-right: 10px;
`;

const Container = styled.div`
  display: flex;
`;

const NotSigned = () => {
  return (
    <Wrapper>
      <SignUp />
      <Container>
        <Text>Already have an account?</Text>
        <StyledLink to="/signin">
          <Text>Sign in</Text>
        </StyledLink>
      </Container>
    </Wrapper>
  );
};

export default NotSigned;
