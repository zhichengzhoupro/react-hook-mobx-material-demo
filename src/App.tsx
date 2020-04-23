import React from 'react';
import './App.css';
import {Redirect, Switch} from 'react-router-dom';
import {ThemeProvider} from '@material-ui/styles';
import theme from "./theme";
import UserContextProvider from "./context/User.context";
import RouteWithLayout from "./components/RouteWithLayout";
import {MainRoutes} from "./routers";

function App() {
    return (
        <>
            <UserContextProvider>
                <ThemeProvider theme={theme}>
                    <Switch>
                        {
                            MainRoutes.map((route: any) => {
                                return <RouteWithLayout layout={route.layout} component={route.component} key={route.path}  path={route.path}
                                                        exact={route.isExact}/>
                            })
                        }

                        <Redirect to="/main" from="/" exact/>
                        <Redirect to="/not-found"/>
                    </Switch>
                </ThemeProvider>
            </UserContextProvider>
        </>
    );
}

export default App;
