import { Box, IconButton, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { deletePost, getPost } from '../service/api';
import CircularProgress from '@mui/material/CircularProgress';
import Comments from '../comments/Comments';
import { AuthContext } from '../context/AuthProvider';

const useStyles = makeStyles(theme => ({
    container: {
        padding: '0 100px',
        [theme.breakpoints.down('md')]: {
            padding: 0
        }
    },
    image: {
        width: '100%',
        height: '50vh',
        objectFit: 'cover'
    },
    icons: {
        float: 'right'
    },
    icon: {
        margin: 5,
        padding: 5,
        border: '1px solid #878787',
        borderRadius: 10
    },
    heading: {
        fontSize: 38,
        fontWeight: 600,
        textAlign: 'center',
        margin: '50px 0 10px 0'
    },
    subheading: {
        color: '#878787',
        display: 'flex',
        margin: '20px 0',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    }
}))

function Detailview()
{
    const classes = useStyles();
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [imageloaded, setImageloaded] = useState(false);
    const [editaccess, setEditaccess] = useState(false);
    const navigate = useNavigate();
    const { user } = React.useContext(AuthContext);

    const url = post.picture || "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

    const fetchPost = async () =>
    {
        const data = await getPost(id);
        setPost({...data.data});
        setImageloaded(true);
        if (data.data.username == (user.email.split('@')[0])) {
            setEditaccess(true);
        }
    }

    const deleteBlog = async () =>
    {
        await deletePost(id);
        navigate('/');
    }

    useEffect(() =>
    {
        fetchPost();
    }, [])

    return (
        <Box className={classes.container}>
            {
                imageloaded ? <img src={url} alt="detailviewimg" className={classes.image} />
                    : <CircularProgress color="secondary" />
            }
            <Box className={classes.icons}>
                {
                    !editaccess ? <></> :
                        <>
                            <Link to={`/update/${id}`}><IconButton><EditIcon color='primary' className={classes.icon} /></IconButton></Link>
                            <IconButton><DeleteIcon color='error' className={classes.icon} onClick={deleteBlog} /></IconButton>
                        </>
                }
            </Box>
            <Typography style={{ fontSize: '38px', fontWeight: 'bold', textAlign: 'center', margin: '50px 0px 10px 0px' }}>{post.title}</Typography>

            <Box className={classes.subheading}>
                <Link to={`/?username=${post.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography>Author: <span style={{ fontWeight: "bold" }}>{post.username}</span></Typography>
                </Link>
                <Typography style={{ marginLeft: 'auto' }}>{new Date(post.createdDate).toLocaleString()}</Typography>
            </Box>
            <Typography>{post.description}</Typography>
            <Comments post={post} />
        </Box>
    )
}

export default Detailview