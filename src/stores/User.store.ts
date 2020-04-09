import UserService from "../services/User.service";

export default class UserStore {

    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

}

