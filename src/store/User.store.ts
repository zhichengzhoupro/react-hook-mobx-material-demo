import {action, observable} from "mobx";
import {createContext} from "react";
import UserService from "../services/User.service";

class UserStore {
    @observable count = localStorage.getItem('user');

    @observable isAuthenticated = false;

    @action
    signInHandler = (userInfo: any) => {

        UserService.signIn(userInfo.email, userInfo.password, true)
            .then((data) => {
                console.log(data);
                this.saveUserIfRemember(true, data.user);
                this.saveToken(data.accessToken);
                this.isAuthenticated = true;
                props.history.push('/'); //this changes the route but does not render the component
            });
    };

    @action
    signUpHandler = (userInfo: any) => {

        UserService.signUp({...userInfo})
            .then((data) => {
                props.history.push('/sign-in'); //this changes the route but does not render the component
            });
    };

    @action
    signOutHandler = () => {
        UserService.signout()
            .then((data) => {
                this.removeToken();
                this.removeUser();
                props.history.push('/sign-in');
            });
    };

    @action
    saveToken = (accessToken: string) => {
        localStorage.setItem('accessToken', accessToken);
    };

    @action
    removeToken = () => {
        localStorage.removeItem('accessToken');
        sessionStorage.removeItem('accessToken');
    };

    @action
    removeUser = () => {
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
    };

    @action
    saveUserIfRemember = (isRememberMe: boolean, user: any) => {
        if (isRememberMe) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            sessionStorage.setItem('user', JSON.stringify(user));
        }
    };

}

const UserStoreContext = createContext(new UserStore());
export default UserStoreContext;