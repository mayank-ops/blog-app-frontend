import React from 'react'
import { Typography, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    banner: {
        backgroundImage: `url(${'https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg'})`,
        width: '100%',
        height: '50vh',
        backgroundPosition: 'left 0px bottom 0px',
        backgroundSize: 'cover'
    },
    wrapper: {
        padding: 20,
        '& > *': {
            marginTop: 50
        }
    },
    text: {
        color: '#878787'
    }
})

function About()
{
    const classes = useStyles();
    return (
        <Box>
            <Box className={classes.banner}></Box>
            <Box className={classes.wrapper}>
                <Typography variant="h3">Blog App</Typography>
                <Typography variant="h5" className={classes.text}>This website allows you to add, update and delete a blog..🙌<br />
                    You can add a blog to a particular category too, you just have to select a category from home page and then click create blog button.
                </Typography>
            </Box>
        </Box>
    )
}

export default About