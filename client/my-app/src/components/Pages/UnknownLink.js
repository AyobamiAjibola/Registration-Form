import { Box, Button, Grid, Typography } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error';
import { Link } from 'react-router-dom';

export default function UnknownLink() {
  return (
    <Grid container item>
        <Grid item
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100%",
                backgroundColor: "#FCCDD2"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    width: 400,
                    height: 200,
                    boxShadow: 5,
                    borderRadius: 2,
                    backgroundColor: "white"
                }}
            >
                <ErrorIcon sx={{fontSize: 80, color: "red", mb: 2, mt: 5}}/>
                <Typography
                    sx={{
                        mr: 3, ml: 4,
                        textAlign: "center",
                        fontWeight: 600,
                        mb: 5
                    }}
                >
                    Opps!! This page cannot be reached please check the link or click this
                    <Button variant="text" component={Link} to={'/'}>home</Button> to go back to the home page
                </Typography>
            </Box>
        </Grid>
    </Grid>
  )
}
