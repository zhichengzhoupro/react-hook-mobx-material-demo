import {makeStyles} from "@material-ui/styles";
import React from "react";
import {UsersToolbar} from "./components";
import {Redirect, Switch} from 'react-router-dom';
import {UserRoutes} from "../../routers";
import RouteWithLayout from "../../components/RouteWithLayout";

const useStyles = makeStyles((theme: any) => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(4)
    }
}));

const Users = (props: any) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {
                props.location.pathname === UserRoutes[0].path ?        <UsersToolbar /> : <></>
            }

            <div className={classes.content}>

                <Switch>

                    {
                        UserRoutes.map(route => {

                            return (
                                <RouteWithLayout layout={null} component={route.component} key={route.path} path={route.path}
                                                 exact={route.isExact}/>
                            )
                        })
                    }

                    <Redirect to={UserRoutes[0].path} from='/users' exact/>

                </Switch>

            </div>
        </div>
    )
}

export default Users;
