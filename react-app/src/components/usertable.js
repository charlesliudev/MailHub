import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import EditBtn from './buttons/editbtn'
import DeleteBtn from './buttons/deletebtn'
import ContactBtn from './buttons/contactbtn'



const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#3F51A5',
        color: theme.palette.common.white,
        fontSize: 14
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

// function createData(name, email) {
//     return { name, email };
// }

const useStyles = makeStyles({
    table: {
        minWidth: 600
    },
});


export default function UserTable({ users, deleteUser, editUser, contactUser }) {
    const classes = useStyles();

    function handleDeleteClick(userid) {
        deleteUser(userid)
    }

    function handleEditClick(userid) {
        editUser(userid)
    }

    function handleContactClick(userid) {
        contactUser(userid)
    }

    return (
        <TableContainer component={Paper} style={{ marginTop: '30px' }}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>User</StyledTableCell>
                        <StyledTableCell align="center">Email</StyledTableCell>
                        <StyledTableCell align="center">Edit</StyledTableCell>
                        <StyledTableCell align="center">Delete</StyledTableCell>
                        <StyledTableCell align="center">Contact</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                            <StyledTableCell align="center">{row.email}</StyledTableCell>
                            <StyledTableCell align="center"> <EditBtn userid={row['_ID']} onEditClick={handleEditClick} /> </StyledTableCell>
                            <StyledTableCell align="center"> <DeleteBtn userid={row['_ID']} onDeleteClick={handleDeleteClick} /> </StyledTableCell>
                            <StyledTableCell align="center"> <ContactBtn userid={row['_ID']} onContactClick={handleContactClick} /> </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}