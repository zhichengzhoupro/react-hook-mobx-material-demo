import React, {Component, useState, useEffect} from 'react';
import {inject, observer} from "mobx-react";
import {Link as RouterLink, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import {withStyles} from '@material-ui/styles';
import {
    Grid,
    Button,
    IconButton,
    TextField,
    Link,
    Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {Facebook as FacebookIcon, Google as GoogleIcon} from '../icons';

interface LoginProps {
    routerStore: any
    classes: any
}


interface LoginState {
        username: any,
        password: any,
        isValid: boolean,
}


const schema = {
    email: {
        presence: {allowEmpty: false, message: 'is required'},
        email: true,
        length: {
            maximum: 64
        }
    },
    password: {
        presence: {allowEmpty: false, message: 'is required'},
        length: {
            maximum: 128
        }
    }
};

const useStyles = (theme: any) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: '100%'
    },
    grid: {
        height: '100%'
    },
    quoteContainer: {
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    },
    quote: {
        backgroundColor: theme.palette.neutral,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(/images/another_auth.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    quoteInner: {
        textAlign: 'center',
        flexBasis: '600px'
    },
    quoteText: {
        color: theme.palette.white,
        fontWeight: 300
    },
    name: {
        marginTop: theme.spacing(3),
        color: theme.palette.white
    },
    bio: {
        color: theme.palette.white
    },
    contentContainer: {},
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    contentHeader: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: theme.spacing(5),
        paddingBototm: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    logoImage: {
        marginLeft: theme.spacing(4)
    },
    contentBody: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center'
        }
    },
    form: {
        paddingLeft: 100,
        paddingRight: 100,
        paddingBottom: 125,
        flexBasis: 700,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },
    title: {
        marginTop: theme.spacing(3)
    },
    socialButtons: {
        marginTop: theme.spacing(3)
    },
    socialIcon: {
        marginRight: theme.spacing(1)
    },
    sugestion: {
        marginTop: theme.spacing(2)
    },
    textField: {
        marginTop: theme.spacing(2)
    },
    signInButton: {
        margin: theme.spacing(2, 0)
    }
});

@inject('routerStore')
@observer
class Login extends Component<LoginProps, LoginState> {

    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isValid: true
        }
    }


    handleSignIn = () => {
    };

    handleBack = () => {
    };

    hasError = (type: string): boolean => {

        return false;
    };


    render() {
        const {classes} = this.props;
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
                                <IconButton onClick={this.handleBack}>
                                    <ArrowBackIcon/>
                                </IconButton>
                            </div>
                            <div className={classes.contentBody}>
                                <form
                                    className={classes.form}
                                    onSubmit={this.handleSignIn}
                                >
                                    <Typography
                                        className={classes.title}
                                        variant="h2"
                                    >
                                        Sign in
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                    >
                                        Sign in with social media
                                    </Typography>
                                    <Grid
                                        className={classes.socialButtons}
                                        container
                                        spacing={2}
                                    >
                                        <Grid item>
                                            <Button
                                                color="primary"
                                                onClick={this.handleSignIn}
                                                size="large"
                                                variant="contained"
                                            >
                                                <FacebookIcon className={classes.socialIcon}/>
                                                Login with Facebook
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                onClick={this.handleSignIn}
                                                size="large"
                                                variant="contained"
                                            >
                                                <GoogleIcon className={classes.socialIcon}/>
                                                Login with Google
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Typography
                                        align="center"
                                        className={classes.sugestion}
                                        color="textSecondary"
                                        variant="body1"
                                    >
                                        or login with email address
                                    </Typography>
                                    <TextField
                                        className={classes.textField}
                                        error={this.hasError('email')}
                                        fullWidth
                                        helperText={
                                            this.hasError('email') ? 'test message email' : null
                                        }
                                        label="User name"
                                        name="username"
                                        onChange={e => this.setState({username: e.target.value})}
                                        type="email"
                                        value={this.state.username || ''}
                                        variant="outlined"
                                    />
                                    <TextField
                                        className={classes.textField}
                                        error={this.hasError('password')}
                                        fullWidth
                                        helperText={
                                            this.hasError('password') ? 'test message password' : null
                                        }
                                        label="Password"
                                        name="password"
                                        onChange={e => this.setState({password: e.target.value})}
                                        type="password"
                                        value={this.state.password || ''}
                                        variant="outlined"
                                    />
                                    <Button
                                        className={classes.signInButton}
                                        color="primary"
                                        disabled={!this.state.isValid}
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
    }
}

// @ts-ignore
export default withStyles(useStyles)(Login);






