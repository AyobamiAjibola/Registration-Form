import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Grid, LinearProgress, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddUser from './AddUser';

export default function Users({setAuth}) {

  const [datas, setDatas] = useState([]);
  const [user, setUser] = useState(false);
  const [usersChange, setUsersChange] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

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

  async function deleteUser(id) {
    try {
      await fetch(`http://localhost:5000/dashboard/user/${id}`, {
        method: "DELETE"
      });

      setDatas(datas.filter(data => data.user_id !== id));
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
                ml: 3
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
                  <TableCell>
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Delete
                    </button>

                    {/* Modal */}
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Confirmation</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                            Are you certain you want to delete this user?
                          </div>
                          <div className="modal-body">
                            Click "YES" to confirm.
                          </div>
                          <div className="modal-body">
                            Click "NO" to return back to the previous page.
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => deleteUser(data.user_id)}>YES</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">NO</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
                ))) : <Typography component='em' sx={{color: 'red', m: 2 }}>{error}</Typography>}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
