import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function EditBtn({ userid, onEditClick }) {
    const classes = useStyles();

    function handleClick(event) {
        onEditClick(userid)
    }

    return (
        <div className={classes.root}>
            <IconButton aria-label="edit" onClick={handleClick}>
                <EditIcon />
            </IconButton>
        </div>
    );
}