import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Box, Button, Grid, LinearProgress, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from './Pagination';


const DelBox = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const Icon = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

export default function Students({setAuth}) {

  // const theme = useTheme();
  const [datas, setDatas] = useState([]);
  const [usersChange, setUsersChange] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const getStudents = async () => {
    try {
      const response = await fetch(`http://localhost:5000/dashboard/form?q=${query}`,{
        method: "GET"
      });
      const jsonData = await response.json();

      setIsPending(false);
      setDatas(jsonData);
      setError(null)
    } catch (err) {
      setIsPending(false)
      setError('Could not fetch data')
    }
  };

  async function deleteForm(id) {
    try {
      await fetch(`http://localhost:5000/dashboard/form/${id}`, {
        method: "DELETE"
      });

      setDatas(datas.filter(data => data.form_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };


  useEffect(() => {
    if (query.length === 0 || query.length > 2) getStudents();
    setUsersChange(false);
    // eslint-disable-next-line
  }, [usersChange, query]);

  //Get current post
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = datas.slice(indexOfFirstPost, indexOfLastPost);

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <Grid item>
      <Grid item mb={6} mt={2}>
        <Box sx={{flexGrow: 1, maxWidth: '30%', margin: 'auto'}}>
            <Typography
              component='div'
              variant='h2'
              align='center'
              sx={{fontWeight: 'bold', boxShadow: 3, borderRadius: 2}}
            >
              Students
            </Typography>
        </Box>
      </Grid>
      <Grid item mb={5}>
        <TableContainer component={Paper} sx={{maxWidth: '95%', margin: 'auto'}}>
        { isPending && <LinearProgress color="success"/>}
          <Button variant="outlined"
            component={Link}
            to={'/new'}
            startIcon={<AddCircleIcon />}
            sx={{'&:hover': {color: 'green', backgroundColor: 'white', border: 'none', boxShadow: 4},
                backgroundColor: 'green',
                border: 'none',
                color: 'white',
                mt: 2,
                ml: 3
              }}
          >
            New Student
          </Button>
          <hr />
          <Box ml={3} mb={4}>
            <input
              className="search"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
            />
          </Box>
          <Table sx={{ minWidth: 650, mr: 10 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>S/N</TableCell>
                <TableCell>Passport</TableCell>
                <TableCell align="left">First Name</TableCell>
                <TableCell align="left">Last Name</TableCell>
                <TableCell align="left">Duration</TableCell>
                <TableCell align="left">Initial Deposit</TableCell>
                <TableCell align="left">Date Created</TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!error ? (currentPosts.map((data, idx) => (
              <TableRow
                key={data.form_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                  <TableCell component="th" scope="row">
                    {data.sn = idx + 1 }
                  </TableCell>
                  <TableCell align="left">
                    <Avatar alt="Student" src={`http://localhost:5000/${data.passport}`} />
                  </TableCell>
                  <TableCell align="left">{data.fname}</TableCell>
                  <TableCell align="left">{data.lname}</TableCell>
                  <TableCell align="left">{data.duration}</TableCell>
                  <TableCell align="left">{data.ini_depo}</TableCell>
                  <TableCell align="left">{data.date_created} </TableCell>
                  <TableCell align="left">
                    <Button
                      component={Link}
                      to={`/details/${data.form_id}`}
                      sx={{'&:hover': {color: 'green', backgroundColor: 'white', border: 'none', boxShadow: 4},
                          backgroundColor: 'green',
                          border: 'none',
                          color: 'white',
                          mt: 2,
                          ml: 3
                        }}
                      >
                      View
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <DelBox>
                      <Button
                        startIcon={<DeleteIcon />}
                        sx={{'&:hover': {color: 'red', backgroundColor: 'white', border: 'none', boxShadow: 4},
                            backgroundColor: 'red',
                            border: 'none',
                            color: 'white',
                            mt: 2,
                            ml: 3
                          }}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        Delete
                      </Button>
                    </DelBox>
                    <Icon>
                      <IconButton
                        aria-label="delete"
                        sx={{'&:hover': {color: 'red', backgroundColor: 'white', border: 'none', boxShadow: 4},
                            backgroundColor: 'red',
                            border: 'none',
                            color: 'white',
                            mt: 2,
                            ml: 3
                          }}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Icon>
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
                              <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={() => deleteForm(data.form_id)}>
                                YES
                              </button>
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
          <Box component='div' sx={{float: 'right', marginRight: 4, mt: 3}}>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={datas.length}
              paginate={paginate}
            />
          </Box>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
