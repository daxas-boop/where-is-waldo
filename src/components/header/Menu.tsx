import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  padding: 5px 16px;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    menuItem: {
      padding: 0,
    },
  })
);

export default function SimpleMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        onClick={handleClick}
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} className={classes.menuItem}>
          <StyledLink to="/">Home</StyledLink>
        </MenuItem>
        <MenuItem onClick={handleClose} className={classes.menuItem}>
          <StyledLink to="/levels">Levels</StyledLink>
        </MenuItem>
        <MenuItem onClick={handleClose} className={classes.menuItem}>
          <StyledLink to="/leaderboard">Leaderboard</StyledLink>
        </MenuItem>
      </Menu>
    </div>
  );
}
