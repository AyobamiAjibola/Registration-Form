import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Backdrop, Box, Button, Fade, Grid, LinearProgress, Modal, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddUser from './AddUser';
import WarningOutlinedIcon from '@mui/icons-material/WarningOutlined';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column"
};

export default function Users({setAuth}) {

  const [datas, setDatas] = useState([]);
  const [user, setUser] = useState(false);
  const [usersChange, setUsersChange] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [delID, setDelId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard/users",{
        method: "GET"
      });
      const jsonData = await response.json();

      setIsPending(false)
      setDatas(jsonData);
      setError(null)
    } catch (err) {
      setIsPending(false)
      setError('Could not fetch data')
    }
  };

  async function deleteUser() {
    try {
      await fetch(`http://localhost:5000/dashboard/user/${delID}`, {
        method: "DELETE"
      });
      setDatas(datas.filter(data => data.user_id !== delID));
      handleClose();
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleClick = () => {
    setUser(true);
  }


  useEffect(() => {
    getUser();
    setUsersChange(false);
  }, [usersChange]);

  return (
    <Grid item>
      <Grid item mb={6} mt={2}>
        <Box sx={{flexGrow: 1, maxWidth: '20%', margin: 'auto'}}>
            <Typography
              component='div'
              variant='h2'
              align='center'
              sx={{fontWeight: 'bold', boxShadow: 3, borderRadius: 2}}
            >
              Users
            </Typography>
        </Box>
      </Grid>
      <Grid item mb={5}>
        <TableContainer component={Paper} sx={{maxWidth: '80%', margin: 'auto'}}>
        { isPending && <LinearProgress color="success"/>}
          <Button variant="outlined"
            onClick={handleClick}
            startIcon={<AddCircleIcon />}
            sx={{'&:hover': {color: 'green', backgroundColor: 'white', border: 'none', boxShadow: 4},
                backgroundColor: 'green',
                border: 'none',
                color: 'white',
                mt: 2,
                ml: 3,
                ...(user && { display: 'none' })
              }}
          >
            Add User
          </Button>
          {user && <AddUser setUser={setUser} setUsersChange={setUsersChange} setAuth={setAuth}/>}
          <hr />
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>S/N</TableCell>
                <TableCell align="center">First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">Username</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!error ? (datas.map((data, idx) => (
              <TableRow
                key={data.username}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                  <TableCell component="th" scope="row">
                    {data.sn = idx + 1 }
                  </TableCell>
                  <TableCell align="center">{data.fname}</TableCell>
                  <TableCell align="center">{data.lname}</TableCell>
                  <TableCell align="center">{data.username}</TableCell>
                  <TableCell align="center">{data.user_email}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant='contained'
                      onClick={() => {
                        setDelId(data.user_id);
                        handleOpen();
                      }}
                      sx={{'&:hover': {color: 'red', backgroundColor: 'white', border: 'none', boxShadow: 4},
                        backgroundColor: 'red',
                        border: 'none',
                        color: 'white'
                      }}
                    >
                      delete
                    </Button>
                  </TableCell>
                </TableRow>
                ))) : <Typography component='em' sx={{color: 'red', m: 2 }}>{error}</Typography>}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h5" component="h2" sx={{fontWeight: 600}}>
                Confirmation <WarningOutlinedIcon sx={{color: "black"}} />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2, fontWeight: 500, color: "red", mb: 3, textAlign: "center" }}>Are you sure you want to delete this contestant?</Typography>
              <Box sx={{display: "flex", justifyContent: "center"}}>
                <Button
                  onClick={deleteUser}
                  size="small"
                  variant="contained"
                  sx={{
                    mb: 2,
                    mr: 5,
                    width: "50%",
                    color: "white",
                    backgroundColor: "red",
                    boxShadow: 4,
                    "&:hover": { backgroundColor: "white", color: "red" }
                  }}
                >
                  YES
                </Button>
                <Button
                  onClick={handleClose}
                  size="small"
                  variant="contained"
                  sx={{
                    mb: 2,
                    width: "50%",
                    color: "white",
                    backgroundColor: "green",
                    boxShadow: 4,
                    "&:hover": { backgroundColor: "white", color: "green" }
                  }}
                >
                  NO
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
    </Grid>
  );
}
