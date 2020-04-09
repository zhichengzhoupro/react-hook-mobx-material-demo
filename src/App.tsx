import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import {mainRoutes} from "./routers/Routers";
import { ThemeProvider } from '@material-ui/styles';
import theme from "./theme";
import {RouteWithLayout} from "./components";

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
            <Switch>
                {
                    mainRoutes.map((route:any) => {
                        return <RouteWithLayout layout={route.layout} component={route.component} exact={route.isExact}/>
                    })
                }
            </Switch>
            </ThemeProvider>


        </>
    );
}

export default App;
