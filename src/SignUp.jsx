import { useRef } from "react";
import { signInUser } from "./supabase.js";
import { useDispatch } from "react-redux";
import { signIn } from "./authSlice.js";
import { useAuth } from "./authHook.js";
import { Navigate, useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signUpUser, checkIfEmailExists } from "./supabase.js";

const defaultTheme = createTheme();

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" >
      {'Copyright © '}
      <Link color="inherit" href="/sign-up">
        Aleksander Andruszkiewicz
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const SignUp = () => {
  const dispatch = useDispatch();
  const isAuth = useAuth();
  
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    


    const values = {
      username: emailRef.current.value,
      password: passwordRef.current.value,
    }
    const emailExists = await checkIfEmailExists(emailRef);



    const { data, error } = await signUpUser(values);

    console.log(values);

    if (error) {
      console.error(error);
      alert('The given user already exists. Please log in ;)')
      navigate("/login");
      return;
    }

    dispatch(signIn(data));
  }

  console.log(isAuth);

  if (isAuth) {
    return <Navigate to={"/main-panel"} />;
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
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              inputRef={emailRef}
              defaultValue="test"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              inputRef={passwordRef}
              
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;