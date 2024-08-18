import { useDispatch } from "react-redux";
import { signOut } from "./authSlice.js";
import { useAuth } from "./authHook.js";
import { Link, Navigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const defaultTheme = createTheme();

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright C '}
            <Link color="inherit" href="/add-funds">
            Aleksander Andruszkiewicz
            </Link>{''}
            {new Date().getFullYear()}
            {''}
        </Typography>
    );
}

const SignOut = () => {
    const dispatch = useDispatch();
    const isAuth = useAuth();

    const handleSignOut = () => {
        dispatch(signOut());
    }

    if (!isAuth) {
        return <Navigate to="/login" />;
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        
                        <Button 
                            onClick={handleSignOut}
                            fullWidth
                            variant="contained"
                            color="error"
                            sx={{mt: 3, mb: 2}}
                            >
                                Sign Out
                            </Button>
                    </Box>
            </Container>
        </ThemeProvider>
    )
}

export default SignOut;