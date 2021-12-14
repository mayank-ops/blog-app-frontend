import { Button } from '@mui/material'
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react'
import { categories } from '../constants/Data'
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles({
    create: {
        margin: 20,
        width: '90%'
    },
    table: {
        border: '1px solid black'
    }
})

function Categories()
{
    const classes = useStyles();
    const location = useLocation();
    let cat = location.search ? location.search.split('=')[1] : 'All';

    if (!categories.includes(cat)) {
        cat = 'All';
    }
    console.log(cat);

    return (
        <>
            <Link to={`/create/${cat}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button variant="contained" color="secondary" style={{ margin: '20px', width: '85%' }}>Create Blog</Button>
            </Link>
            <TableContainer>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <Link to={`/`} style={{ textDecoration: 'none', color: 'inherit' }}><TableCell>All Categories</TableCell></Link>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            categories.map((cat) => (
                                <TableRow>
                                    <Link to={`/?category=${cat}`} style={{ textDecoration: 'none', color: 'inherit' }}><TableCell>{cat}</TableCell></Link>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Categories
