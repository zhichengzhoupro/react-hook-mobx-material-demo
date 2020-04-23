import {MinimalLayout, MainLayout} from "../layouts";
import Login from "../views/sign-in";
import SignUp from "../views/sign-up";
import Main from "../views/main/main";
import Users from "../views/users/Users";
import Dashboard from "../views/Dashboard";
import NotFound from "../views/not-found";

interface Route {
    path: string;
    component: any;
    layout: any,
    isExact: boolean
}

export const MainRoutes: Route[] = [
    {
        path:'/sign-in',
        component: Login,
        layout: MinimalLayout,
        isExact: true,
    },
    {
        path:'/sign-up',
        component: SignUp,
        layout: MinimalLayout,
        isExact: true,
    },
    {
        path:'/main',
        component: Main,
        layout: MainLayout,
        isExact: true,
    },

    {
        path:'/users',
        component: Users,
        layout: MainLayout,
        isExact: false,
    },
    {
        path:'/dashboard',
        component: Dashboard,
        layout: MainLayout,
        isExact: false,
    },
    {
        path:'/not-found',
        component: NotFound,
        layout: MinimalLayout,
        isExact: true,
    }
];

export default MainRoutes;