import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardActions,
    CardContent,
    Avatar,
    Typography,
    Divider,
    Button,
    LinearProgress
} from '@material-ui/core';

const useStyles = makeStyles((theme: any) => ({
    root: {},
    details: {
        display: 'flex'
    },
    avatar: {
        marginLeft: 'auto',
        height: 110,
        width: 100,
        flexShrink: 0,
        flexGrow: 0
    },
    progress: {
        marginTop: theme.spacing(2)
    },
    uploadButton: {
        marginRight: theme.spacing(2)
    }
}));

const UserProfile = (props: any) => {
    const { user, className, ...rest } = props;

    const [uploadOpen, setUploadOpen] = useState(false);

    const classes: any = useStyles();

    const uploadAvatar =  () => {
        console.log('upload avatar');
        setUploadOpen(true);
    };

    const handleUploadClose = () => {
        console.log('upload close');
    }

    const handleUploadSave = (e: any) => {
        console.log('upload save');
    }

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <CardContent>
                <div className={classes.details}>
                    <div>
                        <Typography
                            gutterBottom
                            variant="h2"
                        >
                            {user.displayName}
                        </Typography>
                        <Typography
                            className={classes.locationText}
                            color="textSecondary"
                            variant="body1"
                        >
                            {user.city}, {user.country}
                        </Typography>
                        <Typography
                            className={classes.dateText}
                            color="textSecondary"
                            variant="body1"
                        >
                            {moment().format('hh:mm A')} ({user.timezone})
                        </Typography>
                    </div>
                    <label htmlFor="contained-button-file">
                        <Avatar
                            className={classes.avatar}
                            onClick={uploadAvatar}
                            src={user.avatarUrl}
                        />
                    </label>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        style={{display: 'none'}}
                    />
                </div>
                <div className={classes.progress}>
                    <Typography variant="body1">Profile Completeness: 70%</Typography>
                    <LinearProgress
                        value={70}
                        variant="determinate"
                    />
                </div>
            </CardContent>
            <Divider />
            <CardActions>
                <Button
                    className={classes.uploadButton}
                    color="primary"
                    variant="text"
                >
                    Upload picture
                </Button>
                <Button variant="text">Remove picture</Button>
            </CardActions>
        </Card>
    );
};

UserProfile.propTypes = {
    className: PropTypes.string,
    user: PropTypes.any,
    onChange: PropTypes.any,
};

export default UserProfile;