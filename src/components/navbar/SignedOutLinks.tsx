import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const SignedOutLinks = () => {
  return (
    <>
      <StyledLink to="/signup">
        <Button>Sign up</Button>
      </StyledLink>
      <StyledLink to="/signin">
        <Button>Sign in</Button>
      </StyledLink>
    </>
  );
};

export default SignedOutLinks;
