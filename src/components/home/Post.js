import { Box, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import React from 'react'

const useStyles = makeStyles({
    container: {
        height: 350,
        margin: 10,
        borderRadius: 10,
        border: '1px solid #d3cede',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        '& > *': {
            padding: '0 5px 5px 5px'
        }
        // width: '20%'
    },
    image: {
        height: 150,
        width: '100%',
        objectFit: 'cover',
        borderRadius: '10px 10px 0 0'
    },
    text: {
        color: '#878787',
        fontSize: 12
    },
    heading: {
        fontSize: 18,
        fontWeight: 600,
        textAlign: 'center',
    },
    detail: {
        fontSize: 14,
        wordBreak: 'break-word'
    }
})

function Post({ post })
{
    const classes = useStyles();
    const url = post.picture || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';

    const addEllipsis = (str, limit) =>
    {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    }

    return (
        <Box className={classes.container}>
            <img src={url} alt="image" className={classes.image} />
            <Typography className={classes.text}>{post.categories}</Typography>
            <Typography className={classes.heading}>{addEllipsis(post.title, 20)}</Typography>
            <Typography className={classes.text}>Author: {post.username}</Typography>
            <Typography className={classes.detail}>{addEllipsis(post.description, 50)}</Typography>
        </Box>
    )
}

export default Post