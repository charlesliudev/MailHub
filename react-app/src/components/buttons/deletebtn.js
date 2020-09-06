import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function DeleteBtn({ userid, onDeleteClick }) {
    const classes = useStyles();

    function handleClick(event) {
        onDeleteClick(userid)
    }

    return (
        <div className={classes.root}>
            <IconButton aria-label="delete" onClick={handleClick}>
                <DeleteIcon />
            </IconButton>

        </div>
    );
}