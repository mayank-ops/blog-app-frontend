import axios from 'axios';
const url = '';

export const createPost = async (post) =>
{
    try {
        return await axios.post(`${url}/create`, post);
    } catch (err) {
        console.log(err.message);
    }
}

export const getAllPosts = async (params) =>
{
    try {
        return await axios.get(`${url}/posts/${params}`);
    } catch (err) {
        console.log(err.message);
    }
}

export const getPost = async (id) =>
{
    try {
        console.log("getting post");
        return await axios.get(`${url}/post/${id}`);
    } catch (err) {
        console.log(err.message);
    }
}

export const updatePost = async (id, updatedData) =>
{
    try {
        return await axios.post(`${url}/update/${id}`, updatedData);
    } catch (err) {
        console.log(err.message);
    }
}

export const deletePost = async (id) =>
{
    try {
        return await axios.delete(`${url}/delete/${id}`);
    } catch (err) {
        console.log(err.message);
    }
}

export const uploadFile = async (data) =>
{
    try {
        return await axios.post(`${url}/file/upload`, data);
    } catch (err) {
        console.log(err.message);
    }
}

export const newComment = async (data) =>
{
    try {
        return await axios.post(`${url}/comment/new`, data);
    } catch (err) {
        console.log(err.message);
    }
}

export const getComments = async (id) =>
{
    try {
        return await axios.get(`${url}/comments/${id}`);
    } catch (err) {
        console.log(err.message);
    }
}

export const deleteComment = async (id) =>
{
    try {
        return await axios.delete(`${url}/comment/delete/${id}`);
    } catch (err) {
        console.log(err.message);
    }
}