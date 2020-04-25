import ActionTyps from "./ActionTyps";


function reducer(state: any, action: any) {
    switch (action.type) {
        case ActionTyps.START_AVATAR_UPLOAD:
            return {
                ...state,
                avatarUploading: true,
            };
        case ActionTyps.AVATAR_UPLOAD_SUCCESS:
            return {
                ...state,
                avatarUrl: action.payload.avatarUrl,
                avatarUploading: false,
                avatarChanged: true
            };
        case ActionTyps.AVATAR_UPLOAD_FAILED:
            return {
                ...state,
                avatarUploadError: 'error',
                avatarUploading: false
            };
    }
}

export default reducer;
