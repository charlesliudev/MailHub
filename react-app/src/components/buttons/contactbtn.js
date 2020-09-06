import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function ContactBtn({ userid, onContactClick }) {
    const classes = useStyles();

    function handleClick(event) {
        onContactClick(userid)
    }

    return (
        <div className={classes.root}>
            <IconButton aria-label="contact" onClick={handleClick}>
                <EmailIcon />
            </IconButton>
        </div>
    );
}