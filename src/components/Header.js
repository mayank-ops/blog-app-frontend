import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthProvider';

const useStyles = makeStyles({
    container: {
        color: 'black',
        display: 'flex',
        justifyContent: 'center',
        '& > *': {
            padding: 8
        }
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
})

function Header()
{
    const classes = useStyles();
    const { logout, user } = React.useContext(AuthContext);
    const navigate = useNavigate();

    const logoutUser = async () =>
    {
        await logout();
        navigate('/');
    }

    return (
        <AppBar>
            <Toolbar className={classes.container}>
                <Link to={'/'} className={classes.link}><Typography variant="body1">Home</Typography></Link>
                <Link to={'/about'} className={classes.link}><Typography variant="body1">About</Typography></Link>
                <Link to={'#'} className={classes.link}><Typography variant="body1" onClick={logoutUser}>Logout </Typography></Link>
                <Typography variant="body1">Welcome {user.email.split('@')[0]}</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header