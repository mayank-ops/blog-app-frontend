import { Box, Button, TextareaAutosize } from '@mui/material'
import { makeStyles } from '@mui/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormControl from '@mui/material/FormControl';
import { IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useState, useEffect } from 'react'
import { createPost, uploadFile } from '../service/api';
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider';
import { categories } from '../constants/Data';

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

function Createview()
{
    const classes = useStyles();
    const { cat } = useParams();

    const [post, setPost] = useState(initialValues);
    const [file, setFile] = useState('');
    const navigate = useNavigate();
    const { user } = React.useContext(AuthContext);

    const url = post.picture || "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

    const handleChange = (e) =>
    {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    const savePost = async () =>
    {
        if (!post.title || !post.description) {
            alert('Empty values not allowed');
        }
        else {
            await createPost(post);
            navigate('/');
        }
    }

    const getImage = async () =>
    {
        if (file) {
            const data = new FormData();
            data.append('name', file.name);
            data.append('file', file);
            const res = await uploadFile(data);
            setPost({ ...post, picture: res.data });
        }
    }

    useEffect(() =>
    {
        if (user) {
            const username = user.email.split('@')[0];
            if (!categories.includes(cat)) {
                setPost({ ...post, username: username, categories: 'All', picture: url });
            }
            else {
                setPost({ ...post, username: username, categories: cat, picture: url });
            }
        }
    }, [])

    useEffect(() =>
    {
        const res = getImage();
    }, [file])

    return (
        <>
            <Box className={classes.container}>
                <img src={url} alt="" className={classes.image} />

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
                        onChange={(e) => { handleChange(e) }}
                        name='title'
                        value={post.title}
                    />
                    <Button variant='outlined' onClick={savePost} color='secondary'>publish</Button>
                </FormControl>

                <TextareaAutosize
                    minRows={3}
                    placeholder="tell your story..."
                    className={classes.textarea}
                    onChange={(e) => { handleChange(e) }}
                    name='description'
                    value={post.description}
                />
            </Box>
        </>
    )
}

export default Createview