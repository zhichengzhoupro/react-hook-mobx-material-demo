import BaseHttpService from "./BasicHttp.service";
import {firebase, storage} from "../firebase";

class UserService extends BaseHttpService {

    async signIn(username: string, password: string, isRememberMe: boolean) {
        const result: any = await this.post('user/signin', {username, password});
        return result.data;
    }

    async signUp(userInfo: any) {
        const result: any = await this.post('user/signup', {...userInfo});

        return result.data;
    }

    async getCurrentUser() {
        const result: any = await this.get('user/user');
        if(result) {
            return result.data;
        }

    }

    async getUserById(id: string) {
        const result: any = await this.get(`user/edit/${id}`);
        if(result) {
            return result.data;
        }

    }

    async getUsers() {
        const result: any = await this.get('user/list');
        if(result) {
            return result.data;
        }
        return [];
    }

    async signout() {
        const result: any = await this.get('user/signout');
    }


   uploadAvatar = (file: any) => {
        return (dispatch: any) => {

            const uploadTask = storage.ref(`images/${file.name}`).put(file);

            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                //progress
                (snapshot: any) => {
                    //dispatch(startUploadAvatar());
                },
                // error
                (error:any) => {
                   // dispatch(uploadAvatarFailed())
                },
                () => {
                    storage.ref('images').child(file.name).getDownloadURL().then((url: string) => {
                        //dispatch(uploadAvatarSuccess(url));
                    })
                }
            )
        }
    };
}

export default new UserService();