import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles'
import React from 'react'

const useStyles = makeStyles({
    image: {
        background: `url(${'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}) center/55% repeat-x black`,
        width: '100%',
        height: '50vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        '& :first-child':{
            fontSize : 50,
            color:'#fa7e7e',
            lineHeight : 1
        },
        '& :last-child': {
            fontSize: 20,
            background : 'white'
        }
    }
})

function Banner()
{
    const classes = useStyles();
    return (
        <Box className={classes.image}>
            <Typography>BLOG</Typography>
            <Typography>SHARE YOU STORY HERE</Typography>
        </Box>
    )
}

export default Banner