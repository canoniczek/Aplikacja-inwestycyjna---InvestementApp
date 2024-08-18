import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFunds as addFundsToDb } from './supabase';
import { addSingleFund, setError } from './fundSlice';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { AppBar, Toolbar, CssBaseline, Drawer, List, ListItemButton, ListItemText, TextField, Button, MenuItem, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu'; 



import { signOut } from './authSlice'; 




const Header = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(2),
}));

const drawerWidth = 240;

const CustomInput = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiInputBase-root': {
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.primary.main,
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const AddFunds = () => {
  const investmentTypeRef = useRef();
  const amountRef = useRef();

  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth.user);

  const [mobileOpen, setMobileOpen] = useState(false); 

  // sign out
  const handleSignOut = () => {
    dispatch(signOut());
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    const fund = {
      investment_type: investmentTypeRef.current.value,
      amount: +amountRef.current.value,
      user_id: id,
    };

    try {
      const { data: [newFund], error } = await addFundsToDb(fund);

      if (error) {
        throw new Error(error.message);
      }

      dispatch(addSingleFund(newFund));
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

  





  const drawer = (
    <List>
      {[
        { text: 'Main Panel', path: '/main-panel' },
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
    <Box sx={{ 
        mt: 8,
        mb: 4,
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row'
        },
        alignItems: {
          xs: 'center',
          md: 'flex-start'
        },
        gap: 2
     }}>
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
          <Typography variant="h6" noWrap component="div">
            
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
        sx={{ flexGrow: 1, bgcolor: 'background.paper', p: 3 }}
      >
        <Toolbar />
        <Header position="sticky">
          <Toolbar>
            <Typography variant="h6" component="div">
              Add Funds
            </Typography>
          </Toolbar>
        </Header>

        <Box sx={{ mt: 2 }}>
          <form onSubmit={handleSubmit}>
            <CustomInput
              inputRef={investmentTypeRef}
              select
              label="Type of Investment"
              variant="outlined"
              fullWidth
            >
              <MenuItem value="-">-</MenuItem>
              <MenuItem value="OBLIGACJE">Obligacje</MenuItem>
              <MenuItem value="ETF">ETF</MenuItem>
              <MenuItem value="SAVE ACCOUNT">SAVE ACCOUNT</MenuItem>
            </CustomInput>

            <CustomInput
              inputRef={amountRef}
              type="number"
              label="Amount"
              variant="outlined"
              fullWidth
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default AddFunds;
