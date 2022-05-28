import React from 'react'
import useFetch from '../../utils/useFetch';
import { Box, LinearProgress, Typography } from '@mui/material';
import bg from "../../../Images/card.png";

export default function SixMonths(props) {

    const { error, isPending, data: resource } = useFetch('http://localhost:5000/dashboard/total/four');

  return (
    <Box sx={{
        minWidth: 250,
        height: 200,
        backgroundImage: `url('${bg}')`
        }}>
        <props.Item>
          { error && <Typography component='em' sx={{fontSize: 12}}>{ error }</Typography > }
          { isPending && <LinearProgress color="inherit" sx={{maxWidth: '90%'}} /> }
          { !error ? resource : '' }
          <Typography component='em'>  {resource > 1 ? (!error ? (!isPending ? 'Students' : '') : '') : (!error ? (!isPending ? 'Student' : '') : '')}</Typography>
        </props.Item>
        <Typography
            component='span'
            variant='body'
            pl={1.5}
            sx={{color: '#C5C6D0'}}
        >
            Students on 4 Months plan
        </Typography>
    </Box>
  )
}
