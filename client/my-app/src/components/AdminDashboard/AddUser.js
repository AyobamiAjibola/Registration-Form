import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
import { Box, Button, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { regValues, emailPattern, password } from '../utils/helpers';
import { toast } from "react-toastify";
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import Close from '@mui/icons-material/Close';

export default function Form(props) {

const [values, setValues] = useState({
    showPassword: false,
  });
const [isPending, setIsPending] = useState(false);

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { register, handleSubmit, formState: { errors }, getValues } = useForm({
      defaultValues: regValues,
      mode: 'onTouched',
      criteriaMode: 'firstError',
      reValidateMode: 'onBlur'
  });

  const onSubmit = async (data) => {
    try {
        setIsPending(true);
        const body = data
        const response = await fetch('http://localhost:5000/auth/register', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify(body)
        });

        var parseRes = await response.json();
        toast.error(parseRes.errors)
        setIsPending(false);
        if (parseRes.jwtToken) {
            localStorage.setItem("token", parseRes.jwtToken);
            props.setAuth(true);
          } else {
            toast.error(parseRes);
          }

        props.setUser(false);
        props.setUsersChange(true);
        if(response.ok) {
          toast.success("User registration was Successful");
        };

    } catch (error) {
        setIsPending(false);
        toast.error('Failed to add a user');
    }
  }

  const handleClick = () => {
    props.setUser(false)
  }

  return (
    <Grid mt={6} mb={6} >
      <Grid item container
        spacing={3}
        bgcolor={"background.default"}
        color={"text.primary"}
        sx={{ maxWidth: "60%", margin: 'auto', boxShadow: 5, paddingRight: 4 }}
        component="form" onSubmit={handleSubmit(onSubmit)}
      >
        <Grid item xs={12} sm={12}>
          <Box  sx={{float:'right'}}>
            <IconButton onClick={handleClick}>
              <Close sx={{color: "red"}}/>
            </IconButton>
          </Box>
        </Grid>
        <Grid item sx={{margin: 'auto'}}>
            <Typography variant="h4" gutterBottom sx={{fontWeight: "bold", color: "#51087E"}} >
                User Registration
            </Typography>
            <hr />
        </Grid>
        <hr />
        <Grid item xs={12} sm={6} mt={4} >
          <TextField
            id="fname"
            label="First name"
            fullWidth
            variant="outlined"
            {...register("fname", {
              required: "First name is required",
              maxLength: {
                  value: 20,
                  message: "First name shouldn't be greater than 20 characters",
                }
            })}
          />
            {errors.fname &&
                (<Typography variant='body2' mt={1}
                component='span' sx={{color: 'red', textAlign: 'left'}}
                >{errors.fname?.message}</Typography>)
            }
        </Grid>
        <Grid item xs={12} sm={6} mt={4}>
        <TextField
            id="lname"
            label="Last name"
            fullWidth
            variant="outlined"
            {...register("lname", {
              required: "Last name is required",
              maxLength: {
                  value: 20,
                  message: "Last name shouldn't be greater than 20 characters",
                }
            })}
          />
            {errors.lname &&
                (<Typography variant='body2' mt={1}
                component='span' sx={{color: 'red', textAlign: 'left'}}
                >{errors.lname?.message}</Typography>)
            }
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="username"
            label="Username"
            fullWidth
            variant="outlined"
            {...register("username", {
              required: 'Username is required',
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: 'Not a valid username'
              }
            })}
          />
            {errors.username &&
                (<Typography variant='body2' mt={1}
                component='span' sx={{color: 'red', textAlign: 'left'}}
                >{errors.username?.message}</Typography>)
            }
        </Grid>
        <Grid item xs={12} sm={6} >
          <TextField
            id="email"
            label="Email"
            fullWidth
            variant="outlined"
            {...register("user_email", {
              required: "Email is required",
              pattern: {
                  value: emailPattern,
                  message: "Email is not valid"
              }
            })}
          />
            {errors.user_email &&
                (<Typography variant='body2' mt={1}
                component='span' sx={{color: 'red', textAlign: 'left'}}
                >{errors.user_email?.message}</Typography>)
            }
        </Grid>
        <Grid item xs={12} sm={6} >
            <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                color="secondary"
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
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
        </Grid>
        <Grid item xs={12} sm={6} >
            <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
              <OutlinedInput
                color="secondary"
                id="outlined-adornment-confirm-password"
                type={values.showPassword ? 'text' : 'password'}
                {...register("confirm_password", {
                  required: 'Confirm password is required',
                  pattern: {
                    value: password,
                    message: 'Password cannot be less than 8 characters. \n Must include an upper case letter'
                  },
                  validate: {
                    checkPasswordConfirmationHandler: (value) => {
                        const { user_password } = getValues();
                        return user_password === value || "Passwords don't match";
                    },
                }
                })}
                error={!!errors?.confirm_password}
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
                label="Confirm Password"
              />
            </FormControl>
            {errors.confirm_password &&
                (<Typography variant='body2' mt={1}
                component='span' sx={{color: 'red', textAlign: 'left'}}
                >{errors.confirm_password?.message}</Typography>)
            }
        </Grid>
        <Grid item sm={12} align="center" mb={8} mt={3} >
        <Button
          variant="contained"
          size="large"
          type="submit"
          endIcon={<SendIcon />}
          sx={{ color: "white",
              backgroundColor: "#51087E",
              width: "30ch",
              boxShadow: 4,
              "&:hover": { backgroundColor: "white", color: "#51087E" }
          }}
        >
          Send
        </Button>
        { isPending && <Box container sx={{textAlign: 'center'}} ><CircularProgress color="success" /></Box>}
        </Grid>
      </Grid>
    </Grid>
  );
}