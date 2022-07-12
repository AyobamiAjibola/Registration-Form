import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm } from "react-hook-form";
import { emailPattern, password } from '../utils/helpers';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link to='/'>
        Registration Form
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const loggedValues = {
  user_email: 'demo@gmail.com',
  user_password: 'Demo12345'
}

const theme = createTheme();

export default function Login({ setAuth }) {

  const [values, setValues] = useState({
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: loggedValues,
    mode: 'onTouched',
    criteriaMode: 'firstError',
    reValidateMode: 'onBlur'
  });

  const onSubmit = async (data) => {

    try {
      const body = data

      const response = await fetch(
        "http://localhost:5000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Logged in Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: 4,
            mb: 5,
            borderRadius: 1,
            backgroundColor: "white"
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "right",
              width: "100%"
            }}
          >
            <IconButton sx={{mt: 1, mr: 1}} component={Link} to='/'>
              <CloseIcon size='large' sx={{color: "red"}}/>
            </IconButton>
          </Box>
          <Avatar sx={{ m: 1, bgcolor: '#51087E'}}  >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1, ml: 4, mr: 4 }}
          >
            <TextField
              color="secondary"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              {...register("user_email", {
                required: 'Email is required',
                pattern: {
                  value: emailPattern,
                  message: 'Please enter a valid email address'
                }
              })}
              autoComplete="email"
              autoFocus
              error={!!errors?.user_email}
            />
            {errors.user_email &&
                (<Typography variant='body2' mt={1}
                component='span' sx={{color: 'red', textAlign: 'left'}}
                >{errors.user_email?.message}</Typography>)
            }
            <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                color="secondary"
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                {...register("user_password", {
                  required: 'Password is required',
                  pattern: {
                    value: password,
                    message: 'Password cannot be less than 8 characters. \n Must include an upper case letter'
                  }
                })}
                error={!!errors?.user_password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            {errors.user_password &&
                (<Typography variant='body2' mt={1}
                component='span' sx={{color: 'red', textAlign: 'left'}}
                >{errors.user_password?.message}</Typography>)
            }
            <Button
              type="submit"
              variant="contained"
              endIcon={<LoginIcon />}
              fullWidth
              sx={{ mt: 3,
                mb: 4,
                color: "white",
                backgroundColor: "#51087E",
                boxShadow: 4,
                "&:hover": { backgroundColor: "white", color: "#51087E" }
              }}
            >
              Sign In
            </Button>
            <Copyright sx={{ mt: 2, mb: 6 }} />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}