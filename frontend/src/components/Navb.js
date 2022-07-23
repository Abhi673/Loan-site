import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../images/newLogo.png';
import { useNavigate } from 'react-router-dom';
import { menuItems } from '../utils/menuItems';
import { ROUTES } from '../utils/routes';
import { StateContext } from '../App';

// const pages = ['ApplyLoans', 'Loan Request', 'My Loans', 'Lending'];
const settings = [
    {
        name: 'Profile Update',
        url: ROUTES.PROFILE_UPDATE
    },
    {
        name: 'Logout',
        url : ROUTES.HOME
    }
];

const Navb = () => {
  const [nav,setnav] = React.useState(false);
  const [prof,setprof]=React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const {userDetails} =React.useContext(StateContext);
  const navigate = useNavigate();  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleTouch = () => {
    setnav(!nav);
  };
  
  const handleProfileTouch = () => {
    setprof(!prof);
  };

  return (
    <AppBar position="static" sx={{backgroundColor :'#000f5f' ,paddingLeft: '0px', paddingRight:'0px'}}>
      <Container maxWidth="xl">
        <Toolbar >
            <Box
                component='img'
                sx={{ width: '5rem'}}
                src={Logo}
                alt='logo'
                alignContent={'left'}
            />
          <Typography
            variant="h6"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
             C2C Loan Platform
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {menuItems.map((page) => (
                <MenuItem key={page.menuName} 
                onClick={() =>{
                    handleCloseNavMenu()
                    handleTouch()
                    navigate(page.route) }}>
                  <Typography textAlign="center">{page.menuName}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          {/* <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {menuItems.map((page) => (
              <Button
                key={page}
                onClick={() => {
                    handleTouch()
                    navigate(page.route)
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.menuName}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userDetails.username} src="/" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem 
                key={setting} 
                onClick={()=> {
                    handleCloseUserMenu()
                    handleProfileTouch()
                    navigate(setting.url)
                    }}>
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navb;
