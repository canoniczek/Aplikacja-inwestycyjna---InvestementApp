import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrencyByUserId } from './supabase';
import { setSaves, setError } from './saveSlice';
import { AppBar, Toolbar, Typography, Box, CssBaseline, Drawer, List, ListItemButton, ListItemText, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import SignOut from './SignOut';
import { signOut } from './authSlice';




const Header = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(2),
}));

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
  '& thead th': {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.text.primary,
  },
  '& tbody tr:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const drawerWidth = 240;

const GetSavingHistory = () => {
  const saves = useSelector((state) => state.save.saves);
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
        const { data, error } = await getCurrencyByUserId(id);

        if (error) {
          throw new Error(error.message);
        }

        dispatch(setSaves(data));
      } catch (err) {
        dispatch(setError(err.message));
      }
    })();
  }, [id, dispatch]);

  const drawer = (
    <List>
      {[
        { text: 'Main Panel', path: '/main-panel' },
        { text: 'Add Funds', path: '/add-funds' },
        { text: 'Compare Values', path: '/compare-values' },
        { text: 'Investment Branches', path: '/investment-branches' },
        { text: 'Get Savings History', path: '/get-saving-history' },
        { text: 'Show Funds', path: '/show-funds' }
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

      
      <AppBar position="fixed" sx={{ display: { md: 'none' } }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Your Saving History
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
          },
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
        sx={{ flexGrow: 1, bgcolor: 'background.paper', p: 3, ml: 0 }}
      >

        <Header position="sticky" sx={{ display: { xs: 'none', md: 'block' } }}>
          <Toolbar>
            <Typography variant="h6" component="div">
              Your Saving History
            </Typography>
          </Toolbar>
        </Header>

        <Box sx={{ mt: 8}}>
          <StyledTable size="small">
            <TableHead>
              <TableRow>
                <TableCell>Account Balance</TableCell>
                <TableCell>Date of Entry</TableCell>
                <TableCell>EUR Exchange Rate</TableCell>
                <TableCell>USD Exchange Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {saves.map(({ id, savings_pln, savings_eur, savings_usd, created_at }) => (
                <TableRow key={id}>
                  <TableCell>{savings_pln} PLN</TableCell>
                  <TableCell>{created_at}</TableCell>
                  <TableCell>{savings_eur}</TableCell>
                  <TableCell>{savings_usd}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </Box>
      </Box>
    </Box>
  );
};

export default GetSavingHistory;
