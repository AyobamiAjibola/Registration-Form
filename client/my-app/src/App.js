import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { toast } from "react-toastify";
import Form from './components/Pages/Form';
import Home from './components/Pages/Home';
import Login from './components/Pages/Login';
import Sidebar from './components/AdminDashboard/Sidebar';
import Users from './components/AdminDashboard/Users';
import AdminDash from './components/AdminDashboard/AdminDash';
import Students from './components/AdminDashboard/Students';
import StudentDetail from './components/AdminDashboard/StudentDetail';
import EditForm from './components/AdminDashboard/EditForm';
import AddStudent from './components/AdminDashboard/AddStudent';
import { Box, createTheme, ThemeProvider } from "@mui/material";
import UnknownLink from './components/Pages/UnknownLink';

toast.configure();

function App() {

  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const checkAuthenticated = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/verify", {
          method: "POST",
          headers: { jwtToken: localStorage.token }
        });

        const parseRes = await res.json();

        parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      } catch (err) {
        console.error(err.message);
      }
    };

    useEffect(() => {
      checkAuthenticated();
    }, []);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuth = boolean => {
      setIsAuthenticated(boolean);
    };


  return (
    <BrowserRouter>
    <ThemeProvider theme={darkTheme}>
      <Box bgColor={"background.default"} color={"text.primary"}>
        <Routes>
          <Route element={<Sidebar setAuth={setAuth} setMode={setMode} mode={mode} />} >
              <Route exact path="/dash"
                element={isAuthenticated ?
                (<AdminDash setAuth={setAuth} />) : ( <Navigate to="/login" /> )}
              />
              <Route exact path="/students"
                element={isAuthenticated ?
                  (<Students setAuth={setAuth} />) : ( <Navigate to="/login" /> )}
              />
              <Route exact path="/details/:id"
                element={isAuthenticated ?
                  (<StudentDetail setAuth={setAuth} />) : ( <Navigate to="/login" /> )}
              />
              <Route exact path="/edit/:id"
                element={isAuthenticated ?
                  (<EditForm setAuth={setAuth} setMode={setMode}/>) : ( <Navigate to="/login" /> )}
              />
              <Route exact path="/users"
                element={isAuthenticated ?
                  (<Users setAuth={setAuth} />) : ( <Navigate to="/login" /> )}
              />
              <Route exact path="/new"
                element={isAuthenticated ?
                  (<AddStudent />) : ( <Navigate to="/login" /> )}
              />
          </Route>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/form" element={<Form/>}/>
          <Route
            exact
            path="/login"
            element={!isAuthenticated ? (<Login setAuth={setAuth}/>) : (<Navigate to="/dash" />)}
          />
          <Route path="*" element= {<UnknownLink/>} />
        </Routes>
      </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
