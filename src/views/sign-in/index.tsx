import React, {useContext, useEffect, useState} from 'react';
import {Link as RouterLink, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import {Button, Grid, IconButton, Link, TextField, Typography} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {Facebook as FacebookIcon, Google as GoogleIcon} from '../icons';
import {UserContext} from "../../context/User.context";
import SignInStyles from "../../helpers/sign-in-up.common.styles";

const schema = {
    email: {
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
        userContext.signInHandler(formState.values);
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
                                Hella narwhal Cosby sweater McSweeney's, salvia kitsch before
                                they sold out High Life.
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
                                    Sign in
                                </Typography>
                                <Grid
                                    className={classes.socialButtons}
                                    container
                                    spacing={2}
                                >
                                    <Grid item>
                                        <Button
                                            color="primary"
                                            onClick={handleSignIn}
                                            size="large"
                                            variant="contained"
                                        >
                                            <FacebookIcon className={classes.socialIcon} />
                                            Sign In with Facebook
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            onClick={handleSignIn}
                                            size="large"
                                            variant="contained"
                                        >
                                            <GoogleIcon className={classes.socialIcon} />
                                            Sign In with Google
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Typography
                                    align="center"
                                    className={classes.sugestion}
                                    color="textSecondary"
                                    variant="body1"
                                >
                                    or Sign In with email address
                                </Typography>
                                <TextField
                                    className={classes.textField}
                                    error={hasError('email')}
                                    fullWidth
                                    helperText={
                                        hasError('email') ? formState.errors.email[0] : null
                                    }
                                    label="Email address"
                                    name="email"
                                    onChange={handleChange}
                                    type="text"
                                    value={formState.values.email || ''}
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
                                <Button
                                    className={classes.signInButton}
                                    color="primary"
                                    disabled={!formState.isValid}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                >
                                    Sign in now
                                </Button>
                                <Typography
                                    color="textSecondary"
                                    variant="body1"
                                >
                                    Don't have an account?{' '}
                                    <Link
                                        component={RouterLink}
                                        to="/sign-up"
                                        variant="h6"
                                    >
                                        Sign up
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
