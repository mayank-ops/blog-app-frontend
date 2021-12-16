import React from 'react'
import "./Login.css";
import Button from '@mui/material/Button';
import { AuthContext } from '../components/context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

function Login()
{
    const { login } = React.useContext(AuthContext);
    const navigate = useNavigate();

    const signIn = () =>
    {
        login()
            .then((result) =>
            {
                console.log(result);
                navigate('/');
            })
            .catch((error) =>
            {
                alert(error.message);
            });
    };

    return (
        <div className="login" >
            <div className="login__container">
                <Typography variant='h3' fontStyle='italic' color='Highlight'>Welcome to Blog App</Typography>
                <Button onClick={signIn}>Sign in with Google</Button>
            </div>
        </div >
    )
}

export default Login