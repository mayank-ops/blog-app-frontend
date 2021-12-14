import { Box, Button, TextareaAutosize } from '@mui/material'
import { makeStyles } from '@mui/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormControl from '@mui/material/FormControl';
import { IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, updatePost, uploadFile } from '../service/api';
import CircularProgress from '@mui/material/CircularProgress';


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
    form: {
        display: 'flex',
        flexDirection: 'row'
    },
    textarea: {
        width: '100%',
        marginTop: '30px',
        border: 'none',
        fontSize: '18px',
        '&:focus-visible': {
            outline: 'none'
        }
    }
}));

const initialValues = {
    title: '',
    description: '',
    picture: '',
    username: 'msingh2',
    categories: 'All',
    createdDate: new Date()
}

function Updateview()
{
    const { id } = useParams();
    const classes = useStyles();
    const [post, setPost] = useState(initialValues);
    const [file, setFile] = useState('');
    const navigate = useNavigate();
    const [imageloaded, setImageloaded] = useState(false);
    const url = "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";


    const fetchPost = async () =>
    {
        const data = await getPost(id);
        console.log(data.data);
        setPost(data.data);
        setImageloaded(true);
    }

    const handleChange = (e) =>
    {
        setPost({ ...post, [e.target.name]: e.target.value, createdDate: new Date() });
    }

    const updateBlog = async () =>
    {
        await updatePost(id, post);
        navigate(`/details/${id}`);
    }

    useEffect(() =>
    {
        fetchPost();
    }, [])

    const getImage = async () =>
    {
        if (file) {
            const data = new FormData();
            data.append('name', file.name);
            data.append('file', file);
            const res = await uploadFile(data);
            setPost({ ...post, picture: res.data, createdDate: new Date() });
        }
    }

    useEffect(() =>
    {
        const res = getImage();
    }, [file])

    return (
        <>
            <Box className={classes.container}>
                {
                    imageloaded ? <img src={post.picture || url} alt="detailviewimg" className={classes.image} />
                        : <CircularProgress color="secondary" />
                }
                <FormControl style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
                    {/* <label htmlFor='fileUpload'> */}
                    <IconButton component='label'>
                        <AddCircleIcon
                            color='secondary'
                            fontSize='large'
                        />
                        <input type="file" id='fileUpload' style={{ display: 'none' }} onChange={(e) => { setFile(e.target.files[0]) }} />
                    </IconButton>
                    {/* </label> */}
                    <TextField
                        variant="outlined"
                        style={{ flex: '1', margin: '0 30px' }}
                        value={post.title}
                        name='title'
                        onChange={(e) => { handleChange(e) }}
                    />
                    <Button variant='outlined' color='secondary' onClick={updateBlog}>update</Button>
                </FormControl>

                <TextareaAutosize
                    minRows={3}
                    placeholder="tell your story..."
                    className={classes.textarea}
                    value={post.description}
                    name='description'
                    onChange={(e) => { handleChange(e) }}
                />
            </Box>
        </>
    )
}

export default Updateview
