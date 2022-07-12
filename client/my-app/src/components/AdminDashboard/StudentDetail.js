import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Avatar, Box, Button, CircularProgress } from '@mui/material';
import useFetch from '../utils/useFetch';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function StudentDetail() {

const { id } = useParams();
const { error, isPending, data: datas } = useFetch('http://localhost:5000/dashboard/form/' + id);

  return (
    <Grid mt={6} mb={6} >
      { isPending && <Box container sx={{textAlign: 'center'}} ><CircularProgress color="success" /></Box> }
      { error && <Typography component='em' sx={{color: 'red', marginLeft: 4 }} >{error}</Typography>}
      { datas && (<Grid container
        spacing={3}
        bgcolor={"background.default"}
        color={"text.primary"}
        sx={{
          maxWidth: "60%",
          margin: 'auto',
          paddingRight: 4,
          border: "1px solid #EFEFEF"
        }}
        component="div"
      >
        <Grid item sx={{margin: 'auto'}}>
            <Typography variant="h3" gutterBottom sx={{fontWeight: "bold", color: "#51087E"}} >
                Registration Form
            </Typography>
            <hr />
        </Grid>
        <hr />
        <Grid item xs={12} mb={2} sx={{}}>
            <Box component='div' sx={{width: 150, height: 150, float: 'right' }}>
                <Avatar variant="square" sx={{float: 'right', width: '100%', height: '100%'}} src={`http://localhost:5000/${datas.passport}`}/>
            </Box>
        </Grid>
        <Grid item xs={12} sm={6}  >
        <TextField
          id="outlined-read-only-input"
          label="First Name"
          defaultValue={datas.fname}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          id="outlined-read-only-input"
          label="Last Name"
          defaultValue={datas.lname}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
            />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-read-only-input"
          label="Address"
          defaultValue={datas.address}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          id="outlined-read-only-input"
          label="Phone Number"
          defaultValue={datas.phone_num}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-read-only-input"
          label="Date Of Birth"
          defaultValue={datas.dob}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          id="outlined-read-only-input"
          label="Gender"
          defaultValue={datas.gender}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
            id="outlined-read-only-input"
            label="Marital Status"
            defaultValue={datas.status}
            fullWidth
            InputProps={{
                readOnly: true,
            }}
            />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-read-only-input"
            label="Nationality"
            defaultValue={datas.nationality}
            fullWidth
            InputProps={{
                readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-read-only-input"
            label="Sponsor"
            defaultValue={datas.sponsor}
            fullWidth
            InputProps={{
                readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-read-only-input"
            label="Sponsor Address"
            defaultValue={datas.sponsor_address}
            fullWidth
            InputProps={{
                readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-read-only-input"
            label="Sponsor Phone Number"
            defaultValue={datas.sponsor_phone}
            fullWidth
            InputProps={{
                readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          id="outlined-read-only-input"
          label="Duration"
          defaultValue={datas.duration}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
            id="outlined-read-only-input"
            label="Date Commenced"
            defaultValue={datas.date_comm}
            fullWidth
            InputProps={{
            readOnly: true,
          }}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
            id="outlined-read-only-input"
            label="Fee"
            defaultValue={datas.fee}
            fullWidth
            InputProps={{
            readOnly: true,
            }}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-read-only-input"
            label="Initial Deposit"
            defaultValue={datas.ini_depo}
            fullWidth
            InputProps={{
            readOnly: true,
          }}
          />
        </Grid>
        <Grid item xs={12} sm={6} >
          <TextField
            id="outlined-read-only-input"
            label="Registration Number"
            defaultValue={datas.reg_num}
            fullWidth
            InputProps={{
            readOnly: true,
          }}
          />
        </Grid>
        <Grid item xs={12} sm={6} mb={3} >
          <TextField
            id="outlined-read-only-input"
            label="Email"
            defaultValue={datas.email}
            fullWidth
            InputProps={{
            readOnly: true,
          }}
          />
        </Grid>
        <Grid item xs={12} align="center" mb={5} >
            <Button
                variant="contained"
                size="large"
                fullWidth
                component={Link}
                to={`/edit/${datas.form_id}`}
                sx={{ color: "white",
                    backgroundColor: "#51087E",
                    width: "30ch",
                    boxShadow: 4,
                    "&:hover": { backgroundColor: "white", color: "#51087E" }
                }}
            >
                Edit Form
            </Button>
        </Grid>
      </Grid>)}
    </Grid>
  );
}