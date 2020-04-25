import React, {createContext, useEffect, useReducer, useState} from "react";
import useLocalStorage from "../helpers/userLocalStorage.hook";
import {withRouter} from "react-router";
import history from "../helpers/history";
import UserService from "../services/User.service";
import {getLocalStorageUserInfo} from "../helpers/comme.util";
import {UserReducer} from "../reducers";

export const UserContext = createContext({});

const initialState = {
    avatarUrl: '',
    avatarUploading: false,
    avatarUploadError: '',
    avatarChanged: false,
};


const UserContextProvider = (props: any) => {

    const [user, setUser] = useLocalStorage('user', {});
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const userString = getLocalStorageUserInfo();
        if (userString) {
            const user = JSON.parse(userString);
            setUser(user);
        }
    }, []);

    const signInHandler = (userInfo: any) => {

        UserService.signIn(userInfo.email, userInfo.password, true)
            .then((data) => {
                saveUserIfRemember(true, data.user);
                saveToken(data.accessToken);
                setIsAuthenticated(true);
                props.history.push('/'); //this changes the route but does not render the component
            });
    };

    const signUpHandler = (userInfo: any) => {

        UserService.signUp({...userInfo})
            .then((data) => {
                props.history.push('/sign-in'); //this changes the route but does not render the component
            });
    };

    const signOutHandler = () => {

        UserService.signout()
            .then((data) => {
                removeToken();
                removeUser();
                props.history.push('/sign-in');
            });
    };


    const saveToken = (accessToken: string) => {
        localStorage.setItem('accessToken', accessToken);
    };

    const removeToken = () => {
        localStorage.removeItem('accessToken');
        sessionStorage.removeItem('accessToken');
    };

    const removeUser = () => {
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
    };

    const saveUserIfRemember = (isRememberMe: boolean, user: any) => {
        if (isRememberMe) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            sessionStorage.setItem('user', JSON.stringify(user));
        }
    };

    return (
        <UserContext.Provider value={{
            user,
            signInHandler,
            isAuthenticated,
            signUpHandler,
            signOutHandler,
        }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default withRouter(UserContextProvider)