import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useForm } from "react-hook-form";
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { defaultValues, phonePattern, emailPattern, currencyPattern } from '../utils/helpers';
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";


export default function AddStudent() {
  const navigate = useNavigate()
  const [dob, setDob] = useState(new Date());
  const [date_comm, setDate_comm] = useState(new Date());
  const [fileName, setFileName] = useState('');
  const [setIsPending] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
      defaultValues: defaultValues,
      mode: 'onTouched',
      criteriaMode: 'firstError',
      reValidateMode: 'onBlur'
  });

  const onSubmit = async (data) => {
    try {
    setIsPending(true);
    const formData = new FormData();

    const fields = ['fname', 'lname', 'address', 'phone_num', 'gender', 'status', 'nationality', 'sponsor', 'sponsor_address', 'sponsor_phone', 'duration', 'fee', 'ini_depo', 'email']
    fields.map(field => formData.append(field, data[field]))

    formData.append("dob", dob.toISOString());
    formData.append("date_comm", date_comm.toISOString());
    formData.append("image", fileName);

    const response = await fetch('http://localhost:5000/dashboard/form', {
        method: "POST",
        body: formData,
    });

    var parseRes = await response.json();
    toast.error(parseRes.errors)
    setIsPending(false);

    if(response.ok) {
      toast.success("Sent Successfully");
      navigate('/students')
    }

    } catch (error) {
        setIsPending(false);
        toast.error('Failed to send the form');
    }
  }

  const onChangeFile = e => {
    setFileName(e.target.files[0]);
  }

  return (
    <Grid mt={6} mb={6} >
      <Grid container
        spacing={3}
        sx={{ maxWidth: "60%", margin: 'auto', boxShadow: 5, paddingRight: 4, backgroundColor: 'white' }}
        component="form" onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <Grid item sx={{margin: 'auto'}}>
            <Typography variant="h3" gutterBottom sx={{fontWeight: "bold", color: "#51087E"}} >
                Registration Form
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
        <Grid item xs={12}>
          <TextField
            id="address"
            label="Home Address"
            fullWidth
            variant="outlined"
            {...register("address", {
                required: "Home address is required"
            })}
          />
            {errors.address &&
                (<Typography variant='body2' mt={1}
                component='span' sx={{color: 'red', textAlign: 'left'}}
                >{errors.address?.message}</Typography>)
            }
        </Grid>
        <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                disableFuture
                label="Date Of Birth"
                minDate={new Date('1980/01/01')}
                openTo="year"
                views={['year', 'month', 'day']}
                value={dob}
                onChange={(newValue) => {
                    setDob(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="phone_number"
            label="Phone number"
            fullWidth
            variant="outlined"
            {...register("phone_num", {
              required: 'Phone number is required',
              maxLength: {
                value: 11,
                message: "Phone number can't be more than 11 figures"
              },
              minLength: {
                value: 11,
                message: "Phone number can't be less than 11 figures"
              },
              pattern: {
                value: phonePattern,
                message: 'Please enter a valid phone number',
              }
            })}
          />
            {errors.phone_num &&
                (<Typography variant='body2' mt={1}
                component='span' sx={{color: 'red', textAlign: 'left'}}
                >{errors.phone_num?.message}</Typography>)
            }
        </Grid>
        <Grid item xs={12} sm={6}>
        <div className="form-floating">
        <select
          aria-label="Floating label select example"
          className="form-select form-select-lg"
          id="floatingSelect"
          style={{fontSize: "17px"}}
          {...register("gender", {
            required: "Gender is required"
          })}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <label htmlFor="floatingInput">Gender</label>
        </div>
            {errors.gender &&
                (<Typography variant='body2' mt={1}
                component='span' sx={{color: 'red', textAlign: 'left'}}
                >{errors.gender?.message}</Typography>)
            }
        </Grid>
        <Grid item xs={12} sm={6}>
        <div className="form-floating">
          <select
            aria-label="Floating label select example"
            className="form-select form-select-lg"
            id="floatingSelect"
            style={{fontSize: "17px"}}
            {...register("status", {
              required: "Marital status is required"
            })}
          >
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
          <label htmlFor="floatingInput">Marital Status</label>
        </div>
            {errors.status &&
                (<Typography variant='body2' mt={1}
                component='span' sx={{color: 'red', textAlign: 'left'}}
                >{errors.status?.message}</Typography>)
            }
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="nationality"
            label="Nationality"
            fullWidth
            variant="outlined"
            {...register("nationality", {
              required: 'Nationality is required',
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: 'Not a valid nationality'
              }
            })}
          />
            {errors.nationality &&
                (<Typography variant='body2' mt={1}
                component='span' sx={{color: 'red', textAlign: 'left'}}
                >{errors.nationality?.message}</Typography>)
            }
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="sponsor"
            label="Sponsor Name"
            fullWidth
            variant="outlined"
            {...register("sponsor", {
              required: "Sponsor's name is required"
            })}
          />
            {errors.sponsor &&
                (<Typography variant='body2' mt={1}
                component='span' sx={{color: 'red', textAlign: 'left'}}
                >{errors.sponsor?.message}</Typography>)
            }
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="sponsor_phone"
            label="Sponsor's Phone Number"
            fullWidth
            variant="outlined"
            {...register("sponsor_phone", {
              required: "Sponsor's phone number is required",
              maxLength: {
                value: 11,
                message: "Phone number can't be more than 11 figures"
              },
              minLength: {
                value: 11,
                message: "Phone number can't be less than 11 figures"
              },
              pattern: {
                value: phonePattern,
                message: 'Please enter a valid phone number',
              }
            })}
          />
            {errors.sponsor_phone &&
                (<Typography variant='body2' mt={1}
                component='span' sx={{color: 'red', textAlign: 'left'}}
                >{errors.sponsor_phone?.message}</Typography>)
            }
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="sponsor_address"
            label="Sponsor Home Address"
            fullWidth
            variant="outlined"
            {...register("sponsor_address", {
              required: "Sponsor's address is required"
            })}
          />
            {errors.sponsor_address &&
                (<Typography variant='body2' mt={1}
                component='span' sx={{color: 'red', textAlign: 'left'}}
                >{errors.sponsor_address?.message}</Typography>)
            }
        </Grid>
        <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                disableFuture
                required
                label="Date Commenced"
                minDate={new Date('2020-01-01')}
                openTo="year"
                views={['year', 'month', 'day']}
                value={date_comm}
                onChange={(newValue) => {
                    setDate_comm(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
        <div className="form-floating">
        <select
          aria-label="Floating label select example"
          className="form-select form-select-lg"
          id="floatingSelect"
          style={{fontSize: "17px"}}
          {...register("duration", {
            required: "Duration is required"
          })}
        >
          <option value="4 Months">4 Months</option>
          <option value="6 Months">6 Months</option>
        </select>
        <label htmlFor="floatingInput">Duration</label>
        </div>
            {errors.duration &&
                (<Typography variant='body2' mt={1}
                component='span' sx={{color: 'red', textAlign: 'left'}}
                >{errors.duration?.message}</Typography>)
            }
        </Grid>
        <Grid item xs={12} sm={6}>
            <div className="form-floating">
            <select
                aria-label="Floating label select example"
                className="form-select form-select-lg"
                id="floatingSelect"
                style={{fontSize: "17px"}}
                {...register("fee", {
                    required: "Fee is required"
                })}
            >
            <option value="30,000">30,000</option>
            <option value="60,000">60,000</option>
            </select>
            <label htmlFor="floatingInput">Fee</label>
            </div>
                {errors.duration &&
                    (<Typography variant='body2' mt={1}
                    component='span' sx={{color: 'red', textAlign: 'left'}}
                    >{errors.duration?.message}</Typography>)
                }
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="initial_deposit"
            label="Initial Deposit"
            fullWidth
            variant="outlined"
            {...register("ini_depo", {
              required: "Initial Deposit is required",
              pattern: {
                value: currencyPattern,
                message: 'Invalid, please enter a valid input'
              }
            })}
          />
            {errors.ini_depo &&
                (<Typography variant='body2' mt={1}
                component='span' sx={{color: 'red', textAlign: 'left'}}
                >{errors.ini_depo?.message}</Typography>)
            }
        </Grid>
        <Grid item xs={12} sm={6}>
            <input
                className="form-control form-control-lg"
                id="formFileLg"
                type="file"
                name="image"
                onChange={onChangeFile}
            />
            <Typography
                variant='body'
                component='em'
                sx={{color: "red", fontWeight:"bold" }}
            >
              Passport should not be more than 60kb.
            </Typography>
        </Grid>
        <Grid item xs={12} sm={6} >
          <TextField
            id="email"
            label="Email"
            fullWidth
            variant="outlined"
            {...register("email", {
              required: "Email is required",
              pattern: {
                  value: emailPattern,
                  message: "Email is not valid"
              }
            })}
          />
            {errors.email &&
                (<Typography variant='body2' mt={1}
                component='span' sx={{color: 'red', textAlign: 'left'}}
                >{errors.email?.message}</Typography>)
            }
            <br />
            <Typography
                variant='body'
                component='span'
                sx={{color: "red", fontWeight:"bold" }}
            >
                Note:
            </Typography>
            <Typography
                variant='body2'
                component='em'
            >
                 Detail of your registration will be sent to the email provided. Please make sure it's a working email.
            </Typography>
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
        </Grid>
      </Grid>
    </Grid>
  );
}