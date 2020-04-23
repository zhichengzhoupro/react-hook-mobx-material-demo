import {UserDetail, UsersTable} from "../views/users/components";

export const UserRoutes: any[] = [
    {
        path:'/users/list',
        component: UsersTable,
        exact: false
    },
    {
        path: '/users/edit/:id',
        component: UserDetail,
        exact: false
    }
];

export default UserRoutes;