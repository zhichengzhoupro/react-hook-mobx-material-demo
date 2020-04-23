export const removeLocalStorageInformation = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');

    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('user');
};

export const getLocalStorageUserInfo = () => {
   return localStorage.getItem('user');
}