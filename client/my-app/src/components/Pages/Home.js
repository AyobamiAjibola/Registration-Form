import {
  Button,
  Card,
  CardActions,
  CardContent,
  CssBaseline,
  Grid,
  Paper,
  styled,
  Typography } from '@mui/material';
import { keyframes } from '@mui/system';
import bg from "../../Images/home.png";
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  height: 400,
  width: 300,
  boxShadow: theme.shadows[5]
}));

const blink = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const BlinkedText = styled(Typography)({
  color: 'red',
  animation: `${blink} 1s linear infinite`,
});

const Btn = styled(Button)({
  variant: "contained",
  backgroundColor: "#51087E",
  color: "white",
  "&:hover": {
    backgroundColor: "white",
    color: "#51087E"
  }
});

function Home({setMode}) {

  return (
    <Grid
    sx={{
        flexGrow: 1,
        backgroundImage: `url('${bg}')`,
        height: "100vh",
        width: "100%"
        }} container
      >
      <CssBaseline />
      <Grid item xs={12} mr={5}
        sx={{
            display: "flex",
            justifyContent: "right",
            alignItems: "center"
          }}
        >
        <Button variant="contained" component={Link} to='/login'
          sx={{
            backgroundColor: "transparent",
            border: "1px solid white",
            color: "white",
            boxShadow: 5,
            '&:hover': {backgroundColor: "#51087E", color: "white"}
          }}
        >
          login
        </Button>
      </Grid>
      <Grid item xs={12}>
          <Typography
            variant="h4"
            align="center"
            sx={{color: "white", fontWeight: "bold"}}
          >
            OUR PACKAGES
          </Typography>
        <Grid
          container
          justifyContent="center"
          pt={4}
          spacing={4}
        >
          <Grid item>
            <Item>
              <Card sx={{ minWidth: 275, height: 420 }}>
                <CardContent>
                  <Typography
                    variant='h5'
                    mb={2} gutterBottom
                    align="center"
                    sx={{ fontWeight: "bold" }}
                  >
                    5 MONTHS
                  </Typography>
                  <hr />
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold" }}
                    color="#51087E" mt={1} mb={1}
                    component="div"
                    align= "center"
                  >
                  Computer/Phone Repair Training
                  </Typography>
                  <hr />
                  <Typography variant="subtitle1" mt={2} mb={2} align="justify">
                  Four (4) months of practical software and hardware training on computer and phone repair. And one month for internship.
                  </Typography>
                  <Typography variant='subTitle1' sx={{ fontWeight: "bold", textAlign: "center" }}>FEE: 60,000.00 NGN</Typography>
                </CardContent>
                  <CardActions>
                    <Btn sx={{ boxShadow: 4, margin: "auto" }} href='/form'>Fill Form</Btn>
                  </CardActions>
                <CardContent>
                  <BlinkedText align="center"> 50% Initial Deposit of the fee </BlinkedText>
                </CardContent>
              </Card>
            </Item>
          </Grid>
          <Grid item>
            <Item>
              <Card sx={{ minWidth: 275, height: 420 }}>
                <CardContent>
                  <Typography
                    variant='h5'
                    mb={2} gutterBottom
                    align="center"
                    sx={{ fontWeight: "bold" }}
                  >
                    3 MONTHS
                  </Typography>
                  <hr />
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold" }}
                    color="#51087E" mt={1} mb={1}
                    component="div"
                    align= "center"
                  >
                  Computer/Phone Repair Training
                  </Typography>
                  <hr />
                  <Typography variant="subtitle1" mt={2} mb={2} align="justify">
                    Two (2) months of practical software and hardware training on computer and phone repair. And one month for internship.
                  </Typography>
                  <Typography variant='subTitle1' sx={{ fontWeight: "bold" }}>FEE: 30,000.00 NGN</Typography>
                </CardContent>
                  <CardActions>
                    <Btn sx={{ boxShadow: 4, margin: "auto"}} href='/form'>Fill Form</Btn>
                  </CardActions>
                <CardContent>
                  <BlinkedText align="center"> 50% Initial Deposit of the fee </BlinkedText>
                </CardContent>
              </Card>
            </Item>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Home