import BaseHttpService from "./BasicHttp.service";

export default class UserService extends BaseHttpService {

     async signin(username: string, password: string, isRememberMe: boolean) {
         const result: any = await this.post('/auth/signin', {username, password});
         const accessToken = result.data.accessToken;
         const user = result.data.user;
         this.saveToken(accessToken);
         this.saveUserIfRemember(isRememberMe, user);
         return user;
     }

     saveUserIfRemember(isRememberMe : boolean, user: any){
         if(isRememberMe) {
             localStorage.setItem('user', JSON.stringify(user));
         } else {
             sessionStorage.setItem('user', JSON.stringify(user));
         }
     }

}