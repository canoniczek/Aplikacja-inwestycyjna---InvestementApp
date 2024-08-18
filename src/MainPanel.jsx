import { useEffect, useState } from 'react';
import { getFundsByUserId } from './supabase';
import { useDispatch, useSelector } from 'react-redux';
import { setFunds, setError } from './fundSlice';
import { signOut } from './authSlice';
import { useAuth } from './authHook';
import { AppBar, Toolbar, Typography, Container, Box, CssBaseline, Drawer, List, ListItemButton, ListItemText, IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom'; 
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

const MainPanel = () => {
    const funds = useSelector((state) => state.fund.funds);
    const dispatch = useDispatch();
    const { id } = useSelector((state) => state.auth.user);
    const [mobileOpen, setMobileOpen] = useState(false);
    const isAuth = useAuth();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleSignOut = () => {
        dispatch(signOut());
    };

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
                { text: 'Show Funds', path: '/show-funds' },
                { text: 'Add Funds', path: '/add-funds' },
                { text: 'Compare Values', path: '/compare-values' },
                { text: 'Investment Branches', path: '/investment-branches' },
                { text: 'Get Savings History', path: '/get-saving-history' }
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
                        Main Panel
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
                sx={{ flexGrow: 1, bgcolor: 'background.paper', p: 3, ml: 0 }}
            >
                <AppBar position="sticky" sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Toolbar>
                        <Typography variant="h6" component="div">
                            Main Panel
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Container>
                    <Box sx={{ mt: 30 }}>
                        <Typography variant="h4" component="p">
                            The sum of your savings: {funds.reduce((sum, { amount }) => sum + amount, 0)} PLN
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default MainPanel;
