import { Typography, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteComment } from '../service/api';

const useStyles = makeStyles(theme => ({
    component: {
        marginTop: 30,
        background: '#F5F5F5',
        padding: 10
    },
    container: {
        display: 'flex',
        marginBottom: 5,
        [theme.breakpoints.down('sm')]: {
            // display: 'block'
        }
    },
    delete: {
        marginLeft: 'auto'
    }
}))

function Comment({ comment, setToggle, editAccess })
{
    const classes = useStyles();

    const removeComment = async () =>
    {
        await deleteComment(comment._id);
        setToggle(val => !val);
    }

    return (
        <Box className={classes.component}>
            <Box className={classes.container}>
                <Typography style={{ fontWeight: '600', fontSize: '15px' }}>{comment.name}</Typography>
                <Typography style={{ fontSize: '15px', color: '#878787', marginLeft: '10px' }}>{new Date(comment.date).toLocaleString()}</Typography>
                {editAccess && <DeleteIcon style={{ marginLeft: 'auto' }} onClick={removeComment} />}
            </Box>
            <Typography style={{ fontSize: '13px' }}>{comment.comments}</Typography>
        </Box>
    )
}

export default Comment