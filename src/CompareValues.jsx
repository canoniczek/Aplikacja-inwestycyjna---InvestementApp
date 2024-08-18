import { useState } from 'react';
import CatchEuro from './CatchEuro';
import CatchUSD from './CatchUSD';
import SaveSavings from './SaveSavings';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { AppBar, Toolbar, CssBaseline, Drawer, List, ListItemButton, ListItemText, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

import SignOut from './SignOut';
import { useDispatch } from 'react-redux';
import { signOut } from './authSlice';

const Header = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(2),
}));

const CustomSelect = styled(Select)(({ theme }) => ({
  width: '100%',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.primary.main}`,
  '& .MuiSelect-select': {
    padding: theme.spacing(1.5),
  },
}));

const drawerWidth = 240;

const CompareValues = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const dispatch = useDispatch();

  const handleSelectChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSignOut = () => {
    dispatch(signOut());
  }

  const drawer = (
    <List>
      {[
        { text: 'Main Panel', path: '/main-panel' },
        { text: 'Add Funds', path: '/add-funds' },
        { text: 'Compare Values', path: '/compare-values' },
        { text: 'Investment Branches', path: '/investment-branches' },
        { text: 'Get Savings History', path: '/get-saving-history'}
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
    <>
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
            Comparison of Your Funds Relative to Currencies
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
        sx={{ flexGrow: 1, bgcolor: 'background.paper', p: 3, ml: {xs: 2, md: 30} }}
      >
       
        <AppBar position="sticky" sx={{ display: { xs: 'none', md: 'block' } }}>
          <Toolbar>
            <Typography variant="h6" component="div">
              Comparison of Your Funds Relative to Currencies
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ mt: { xs: 8, md: 2 } }}>
          <FormControl fullWidth>
            <InputLabel id="currency-select-label">Choose Currency</InputLabel>
            <CustomSelect
              labelId="currency-select-label"
              value={selectedCurrency}
              onChange={handleSelectChange}
              label="Choose Currency"
            >
              <MenuItem value="-">-</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
            </CustomSelect>
          </FormControl>
        </Box>
        <Box sx={{ mt: 2 }}>
          {selectedCurrency === 'EUR' && <CatchEuro />}
          {selectedCurrency === 'USD' && <CatchUSD />}
        </Box>
        <Box sx={{ mt: 2 }}>
          <SaveSavings />
        </Box>
      </Box>
    </>
  );
};

export default CompareValues;
