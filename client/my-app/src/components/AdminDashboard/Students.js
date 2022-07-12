import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Backdrop, Box, Button, Fade, Grid, LinearProgress, Modal, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from './Pagination';
import WarningOutlinedIcon from '@mui/icons-material/WarningOutlined';


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

export default function Students({setAuth}) {

  const [datas, setDatas] = useState([]);
  const [usersChange, setUsersChange] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [delID, setDelId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  async function deleteForm() {
    try {
      await fetch(`http://localhost:5000/dashboard/form/${delID}`, {
        method: "DELETE"
      });

      setDatas(datas.filter(data => data.form_id !== delID));
      handleClose();
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
                          ml: 3
                        }}
                      >
                      View
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <DelBox>
                      <Button
                        variant='contained'
                        onClick={() => {
                          setDelId(data.form_id);
                          handleOpen();
                        }}
                        sx={{
                          '&:hover':
                            {color: 'red',
                              backgroundColor: 'white',
                              border: 'none',
                              boxShadow: 4
                            },
                          backgroundColor: 'red',
                          border: 'none',
                          color: 'white'
                        }}
                      >
                        delete
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
                        onClick={() => {
                          setDelId(data.user_id);
                          handleOpen();
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Icon>
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
                  onClick={deleteForm}
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
