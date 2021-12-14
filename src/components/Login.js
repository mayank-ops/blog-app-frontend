import React from 'react'
import "./Login.css";
import Button from '@mui/material/Button';
import { AuthContext } from '../components/context/AuthProvider';
import { useNavigate } from 'react-router-dom';

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
                <img
                    src="https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png"
                    alt=""
                />
                <Button onClick={signIn}>Sign in with Google</Button>
            </div>
        </div >
    )
}

export default Login