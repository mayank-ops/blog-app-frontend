import { Grid } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { getAllPosts } from '../service/api';
import Post from './Post'

function Posts()
{
    // const posts = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [posts, setPosts] = useState([]);
    const { search } = useLocation();

    const fetchData = async () =>
    {
        const res = await getAllPosts(search);
        console.log(res.data);
        setPosts(res.data);
    }

    useEffect(() =>
    {
        fetchData();
    }, [search])

    return (
        <>
            {
                posts.map((post) => (
                    <Grid item lg={3} sm={4} xs={12}>
                        <Link to={`/details/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Post post={post} />
                        </Link>
                    </Grid>
                ))
            }
        </>
    )
}

export default Posts
