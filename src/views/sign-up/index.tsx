import React, {useState, useEffect, useContext} from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Button,
    IconButton,
    TextField,
    Link,
    Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { Facebook as FacebookIcon, Google as GoogleIcon } from '../icons';
import {UserContext} from "../../context/User.context";
import SignInStyles from "../../helpers/sign-in-up.common.styles";

const schema = {
    username: {
        presence: { allowEmpty: false, message: 'is required' },
        email: true,
        length: {
            maximum: 64
        }
    },
    password: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 128
        }
    }
};

interface Formstate {
    isValid: boolean,
    values: any,
    touched: any,
    errors: any
}
const SignIn = (props: any) => {
    const { history } = props;

    const classes: any = SignInStyles();

    const userContext: any = useContext(UserContext);

    const [formState , setFormState] = useState<Formstate>({
        isValid: false,
        values: {},
        touched: {},
        errors: {}
    });

    useEffect(() => {
        const errors = validate(formState.values, schema);

        setFormState(formState => ({
            ...formState,
            isValid: errors ? false : true,
            errors: errors || {}
        }));
    }, [formState.values]);

    const handleBack = () => {
        history.goBack();
    };

    const handleChange = (event: any) => {
        event.persist();

        setFormState(formState => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]:
                    event.target.type === 'checkbox'
                        ? event.target.checked
                        : event.target.value
            },
            touched: {
                ...formState.touched,
                [event.target.name]: true
            }
        }));
    };

    const handleSignIn = (event: any) => {
        event.preventDefault();
        userContext.signUpHandler(formState.values);
    };

    const hasError = (field: any) =>
        formState.touched[field] && formState.errors[field] ? true : false;

    return (
        <div className={classes.root}>
            <Grid
                className={classes.grid}
                container
            >
                <Grid
                    className={classes.quoteContainer}
                    item
                    lg={5}
                >
                    <div className={classes.quote}>
                        <div className={classes.quoteInner}>
                            <Typography
                                className={classes.quoteText}
                                variant="h1"
                            >
                                hahahaah
                            </Typography>
                            <div className={classes.person}>
                                <Typography
                                    className={classes.name}
                                    variant="body1"
                                >
                                    Takamaru Ayako
                                </Typography>
                                <Typography
                                    className={classes.bio}
                                    variant="body2"
                                >
                                    Manager at inVision
                                </Typography>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid
                    className={classes.content}
                    item
                    lg={7}
                    xs={12}
                >
                    <div className={classes.content}>
                        <div className={classes.contentHeader}>
                            <IconButton onClick={handleBack}>
                                <ArrowBackIcon />
                            </IconButton>
                        </div>
                        <div className={classes.contentBody}>
                            <form
                                className={classes.form}
                                onSubmit={handleSignIn}
                            >
                                <Typography
                                    className={classes.title}
                                    variant="h2"
                                >
                                    Sign Up
                                </Typography>
                                <TextField
                                    className={classes.textField}
                                    error={hasError('username')}
                                    fullWidth
                                    helperText={
                                        hasError('username') ? formState.errors.username[0] : null
                                    }
                                    label="User Name"
                                    name="username"
                                    onChange={handleChange}
                                    type="text"
                                    value={formState.values.username || ''}
                                    variant="outlined"
                                />
                                <TextField
                                    className={classes.textField}
                                    error={hasError('password')}
                                    fullWidth
                                    helperText={
                                        hasError('password') ? formState.errors!.password[0] : null
                                    }
                                    label="Password"
                                    name="password"
                                    onChange={handleChange}
                                    type="password"
                                    value={formState.values.password || ''}
                                    variant="outlined"
                                />
                                <TextField
                                    className={classes.textField}
                                    fullWidth
                                    label="Display Name"
                                    name="displayName"
                                    onChange={handleChange}
                                    type="text"
                                    value={formState.values.displayName || ''}
                                    variant="outlined"
                                />
                                <Button
                                    className={classes.signInButton}
                                    color="primary"
                                    disabled={!formState.isValid}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                >
                                    Sign Up now
                                </Button>
                                <Typography
                                    color="textSecondary"
                                    variant="body1"
                                >
                                    already have account?{' '}
                                    <Link
                                        component={RouterLink}
                                        to="/sign-in"
                                        variant="h6"
                                    >
                                        Sign In
                                    </Link>
                                </Typography>
                            </form>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

SignIn.propTypes = {
    history: PropTypes.object
};

export default withRouter(SignIn);
