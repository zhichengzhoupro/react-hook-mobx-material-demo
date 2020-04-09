import Login from "../views/login";
import {Minimal} from "../layouts";


interface Route {
    path: string;
    component: any;
    layout: any,
    isExact: boolean
}

export const mainRoutes: Route[] = [
    {
        path:'/login',
        component: Login,
        layout: Minimal,
        isExact: true,
    }
];
