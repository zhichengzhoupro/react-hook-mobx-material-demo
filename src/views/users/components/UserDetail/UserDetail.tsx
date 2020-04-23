import React, {useEffect, useState} from "react";
import {UserService} from "../../../../services";
import {Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import UserInformation from "./UserInofrmation";
import UserProfile from "./UserProfile";

const useStyles = makeStyles((theme: any) => ({
    root: {},
    content: {
        padding: 0
    },
    inner: {
        minWidth: 1050
    },
    nameContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    avatar: {
        marginRight: theme.spacing(2)
    },
    actions: {
        justifyContent: 'flex-end'
    }
}));

const UserDetail = (props: any) => {

    const classes = useStyles();

    const [user, setUser] = useState<any>({});

    useEffect(() => {
        UserService.getUserById(props.match.params.id).then((data) => {
            setUser(data);
        })
    }, []);

    const handleChange = (event: any) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    };
    return (
        <Grid
            container
            justify="center"
            spacing={10}
        >
            <Grid
                item
                lg={4}
                md={6}
                xl={4}
                xs={12}
            >
                <UserProfile onChange={handleChange} user={user}/>
            </Grid>
            <Grid
                item
                lg={8}
                md={6}
                xl={6}
                xs={12}
            >
                <UserInformation onChange={handleChange} user={user}/>
            </Grid>
        </Grid>


    )
};

export default UserDetail;