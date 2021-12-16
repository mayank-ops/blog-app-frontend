import { Box, Button, TextareaAutosize } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { makeStyles } from '@mui/styles';
import { newComment, getComments } from '../service/api';
import Comment from './Comment';
import Pusher from 'pusher-js';

const useStyles = makeStyles({
    container: {
        margin: '100px 0',
        display: 'flex',
        '& > *': {
            // padding: '10px '
        }
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: '50%'
    },
    textarea: {
        height: 100,
        width: '100%',
        margin: '0 20px'
    },
    button: {
        height: 40
    }
})

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

const pusher = new Pusher('83a9269d53efd71b9741', {
    cluster: 'ap2'
});

function Comments({ post })
{
    const { user } = React.useContext(AuthContext);
    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);
    const url = user.photoURL || 'https://static.thenounproject.com/png/12017-200.png';
    const classes = useStyles();
    const currUser = user.email.split('@')[0];
    const [currComment, setCurrComment] = useState('');

    const handleChange = (e) =>
    {
        setComment({
            ...comment,
            name: currUser,
            postId: post._id,
            comments: e.target.value
        })
        setCurrComment(e.target.value);
    }

    const postComment = async () =>
    {
        if (!comment.comments) {
            alert('please enter a comment..!!');
        }
        else {
            const data = await newComment(comment);
            setCurrComment('');
            // setToggle(!toggle); // uncomment once pusher's limit reaches threshold
        }
    }

    const fetchComments = async () =>
    {
        const data = await getComments(post._id);
        setComments([...data.data]);
    }

    useEffect(() =>
    {
        fetchComments();
    }, [post, toggle])

    useEffect(() =>
    {
        const channel = pusher.subscribe('comments');
        channel.bind('newComment', function (change)
        {
            console.log(post._id);
            fetchComments();
        })
        channel.bind('commentDeleted', function (change)
        {
            fetchComments();
        })
        return () =>
        {
            channel.unbind_all();
            channel.unsubscribe();
        }
    }, [post])

    return (
        <Box>
            <Box className={classes.container}>
                <img src={url} alt="dp" className={classes.image} />
                <TextareaAutosize
                    minRows={3}
                    className={classes.textarea}
                    name='description'
                    value={currComment}
                    onChange={(e) => { handleChange(e) }}
                />
                <Button variant='contained' className={classes.button} onClick={postComment}>post</Button>
            </Box>
            {
                comments && comments.map((comm) => (
                    <Comment comment={comm} setToggle={setToggle} editAccess={comm.name === currUser} />
                ))
            }
        </Box>
    )
}

export default Comments