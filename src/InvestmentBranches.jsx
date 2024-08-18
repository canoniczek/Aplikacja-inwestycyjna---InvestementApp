import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFundsByUserId } from './supabase';
import { setFunds, setError } from './fundSlice';
import { Box, Paper, Typography, Drawer, List, ListItemButton, ListItemText, CssBaseline, AppBar, Toolbar, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';


import SignOut from './SignOut';
import { signOut } from './authSlice';

const Container = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2, 0),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.primary.light}`, 
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.background.paper,
  maxWidth: 600, 
  margin: 'auto',
}));

const CustomParagraph = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: 0,
  borderBottom: `1px solid ${theme.palette.divider}`, 
  fontSize: '1rem',
  color: theme.palette.text.primary,
  '&:last-of-type': {
    borderBottom: 'none',
  },
}));

const drawerWidth = 240;

const InvestmentBranches = () => {
  const funds = useSelector((state) => state.fund.funds);
  const dispatch = useDispatch();
  
  const { id } = useSelector((state) => state.auth.user);
  const [mobileOpen, setMobileOpen] = useState(false); 

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSignOut = () => {
    dispatch(signOut());
  }

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await getFundsByUserId(id);

        if (error) {
          throw new Error(error.message);
        }

        dispatch(setFunds(data));
      } catch (err) {
        dispatch(setError(err.message));
      }
    })();
  }, [id, dispatch]);

  const drawer = (
    <List>
      {[
        { text: 'Main Panel', path: '/main-panel' },
        { text: 'Show History', path: '/get-saving-history' },
        { text: 'Add Funds', path: '/add-funds' },
        { text: 'Compare Values', path: '/compare-values' },
        { text: 'Investment Branches', path: '/investment-branches' },
        { text: 'Get Savings History', path: '/get-saving-history'},
        { text: 'Show Funds', path: '/show-funds'}
      ].map(({ text, path }) => (
        <ListItemButton
          component={Link}
          to={path}
          key={text}
          sx={{
            my: 1,
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.main',
              color: 'white',
            },
          }}
        >
          <ListItemText primary={text} />
        </ListItemButton>
      ))}
            <ListItemButton
    onClick={handleSignOut}
    sx={{
        my: 1,
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'error.main',
        '&:hover': {
            bgcolor: 'error.main',
            color: 'white',
            },
        }}
    >
        <ListItemText primary="Sign Out" />
    </ListItemButton>

    </List>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      
      <AppBar position="fixed" sx={{ bgcolor: 'primary.main', color: 'white', display: { xs: 'block', md: 'none' }, height: 64 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Investment Branches
          </Typography>
        </Toolbar>
      </AppBar>

      
      <AppBar position="fixed" sx={{ bgcolor: 'primary.main', color: 'white', display: { xs: 'none', md: 'block' }, height: 64 }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: 'center', ml: 30}}>
            Investment Branches
          </Typography>
        </Toolbar>
      </AppBar>


      <Drawer
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'background.paper',
            borderRight: '1px solid #ddd',
          }
        }}
        variant="permanent"
        anchor="left"
      >
        {drawer}
      </Drawer>

      
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'background.paper',
          },
        }}
      >
        {drawer}
      </Drawer>

      
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.paper', p: 3, mt: { xs: 8, md: 8 } }} 
      >
        <Container>
          <CustomParagraph>
            In your savings account, you have a total of: {
              funds.reduce((sum, fund) => {
                if (fund.investment_type === 'SAVE ACCOUNT') {
                  return sum + fund.amount;
                }
                return sum;
              }, 0)} PLN
          </CustomParagraph>
          <CustomParagraph>
            In foreign ETFs, you have a total of: {
              funds.reduce((sum, fund) => {
                if (fund.investment_type === 'ETF') {
                  return sum + fund.amount;
                }
                return sum;
              }, 0)} PLN
          </CustomParagraph>
          <CustomParagraph>
            In bonds, you have a total of: {
              funds.reduce((sum, fund) => {
                if (fund.investment_type === 'OBLIGACJE') {
                  return sum + fund.amount;
                }
                return sum;
              }, 0)} PLN
          </CustomParagraph>
        </Container>
      </Box>
    </Box>
  );
};

export default InvestmentBranches;
