import React, { useEffect, useState } from 'react';
import { useDrawerContext } from '../../providers/DrawerStateProvider';
import { useBadgeContext } from '../../providers/BadgesStateProvider';
import { useStoreContext } from '../../state/store/provider';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AppBar from '@mui/material/AppBar';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import './styles.css';
import Auth from '../../utils/auth';
import SideCart from '../SideCart';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const StyledIconButton = styled(IconButton)({
  color: 'inherit',
});

const Icons = styled(Box)(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  gap: '20px',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
}));

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const Navbar = () => {
  let navigate = useNavigate();

  const [navigateLogout, setNavigateLogout] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const { setDrawerState } = useDrawerContext();
  const { wishListCount } = useBadgeContext();
  const [state] = useStoreContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  let drawerDefault = { bottom: false, right: false };
  let drawerDirection = { bottom: false, right: false };

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (navigateLogout) {
      const timeout = setTimeout(() => {
        navigate('/login');
        setNavigateLogout(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [navigateLogout, navigate]);

  const redirectToOrders = (e) => {
    navigate('/wardrobe/lists/owned');
  };

  const redirectToHome = (e) => {
    navigate('/');
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (windowDimensions.width < 700) {
    console.log('window width < 700', windowDimensions.width);
    drawerDirection = { bottom: true, right: false };
    console.log(drawerDirection);
  } else {
    console.log('window width > 700', windowDimensions.width);
    drawerDirection = { bottom: false, right: true };
    console.log(drawerDirection);
  }

  return (
    <>
      <AppBar position="sticky">
        <StyledToolbar>
          <Stack spacing={2} direction="row">
            <Button className="category-button" variant="text" color="secondary">
              Men
            </Button>
            <Button className="category-button" variant="text" color="secondary">
              Women
            </Button>
            <Button className="category-button" variant="text" color="secondary">
              Kids
            </Button>
          </Stack>
          <a className="logo-link" href="/">
            <Typography variant="h6" sx={{ display: { xs: 'block', sm: 'block' } }} onClick={redirectToHome}>
              🅱🅰🅱🆈🅻🅾🅽
            </Typography>
          </a>
          {/* <AutoAwesomeIcon sx={{ display: { xs: 'block', sm: 'none' } }} /> */}
          <Icons sx={{ display: { xs: 'block', sm: 'block' } }}>
            <Tooltip title="Profile">
              <StyledIconButton onClick={handleClick}>
                <PersonOutlineIcon />
              </StyledIconButton>
            </Tooltip>
            <Tooltip title="Wish list">
              <StyledIconButton onClick={() => navigate('/wardrobe/lists/liked')}>
                <Badge badgeContent={wishListCount} color="secondary">
                  <FavoriteBorderIcon />
                </Badge>
              </StyledIconButton>
            </Tooltip>
            <Tooltip title="Shopping Bag">
              {/* <StyledIconButton> */}
              <ClickAwayListener
                onClick={() => {
                  setDrawerState(drawerDirection);
                }}
                onClickAway={() => {
                  setDrawerState(drawerDefault);
                }}>
                <Badge badgeContent={state.cart.length} color="secondary">
                  <SideCart />
                </Badge>
                {/* </ClickAwayListener> */}
              </ClickAwayListener>
              {/* </StyledIconButton> */}
            </Tooltip>
          </Icons>
        </StyledToolbar>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
          {!Auth.loggedIn() && (
            <MenuItem component={RouterLink} to="/login">
              Login
            </MenuItem>
          )}
          {/* <MenuItem>Profile</MenuItem> */}
          {Auth.loggedIn() ? (
            <>
              <MenuItem component={RouterLink} to="/login">
                My account
              </MenuItem>
              <MenuItem component={RouterLink} to="/items">
                All Items
              </MenuItem>
              <MenuItem component={RouterLink} to="/lookfeed">
                Looks
              </MenuItem>
              <MenuItem component={RouterLink} to="/dashboard">
                Dashboard
              </MenuItem>
            </>
          ) : (
            <MenuItem component={RouterLink} to="/register">
              Register
            </MenuItem>
          )}
          {Auth.loggedIn() && (
            <MenuItem
              onClick={() => {
                redirectToOrders();
              }}>
              Orders
            </MenuItem>
          )}
          {Auth.loggedIn() && (
            <MenuItem
              onClick={() => {
                Auth.logout();
                setNavigateLogout(true);
              }}>
              Logout
            </MenuItem>
          )}
          {/* <MenuItem>Logout</MenuItem> */}
        </Menu>
      </AppBar>
      <Snackbar open={navigateLogout}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Logout Success!
        </Alert>
      </Snackbar>
      {/* <Notification /> */}
    </>
  );
};

export default Navbar;
