import { profileLoading, handleProfilesResponse } from './actions/app-profile';
import { handleLoginResponse, setToast, handleCountriesResponse } from './actions/app-actions';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';


export function login(dispatch, data) {
    axios.post(`/signin`, data)
        .then(response => {
            const {data} = response;
            if (data.success) {
                // console.log('Login success');
                dispatch(handleLoginResponse(response));
                // navigate('login');
            } else {
                console.log('Login failure');
                dispatch(setToast({
                    type: 'failure',
                    message: 'Invalid Credentials!'
                }));
            }
        });
}

export function incompleteFields(dispatch) {
    // console.log('entered app-actions');
    dispatch(setToast({
        type: 'incomplete',
        message: 'Please fill out all fields'
    }));
}
export function emailValidation(dispatch) {
    dispatch(setToast({
        type: 'failure',
        message: 'Invalid email format'
    }));
}

export function fetchProfile(dispatch, userObj) {
    const {id: userID} = userObj;
    dispatch(profileLoading());
    axios.get(`/api/users/${userID}`)
        .then(response => {
            dispatch(handleProfilesResponse(response));
        });
}

export function capitalizeFirst(str){
    if (!str) {
        return;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function updateProfile(dispatch, params, callback) {
    if (params.id)
        delete params.id;
    axios.put(`/api/users/profile`, params)
        .then(response => {
            const {data} = response;
            if (data.success) {
                dispatch(setToast({
                    type: 'success',
                    message: 'User profile updated successfully!'
                }));
                return callback(null, true);
            } else {
                return callback(true);
            }
        });
}

export function register(dispatch, data, callback) {
    // const navigate = useNavigate();
    // dispatch(profileLoading());
    axios.post(`/signup`, data)
        .then(response => {
            const {data} = response;
            if (data.success) {
                console.log('Registration success');
                return callback(null, true);
                // navigate('login');
            } else {
                const msg = data.message.message; 
                // console.log(data.message.message);
                if (msg == "That username is already taken") {
                    dispatch(setToast({
                        type: 'failure',
                        message: 'That username is already taken'
                    }));
                }
                return callback(true);
            }
        });
}

export function pollForUpdates(dispatch, last_count, callback) {
    axios.get(`/api/poll?last_count=${last_count}`)
        .then(response => {
            const {data} = response;
            if (data.success) {
                callback(null, data.data);
            }
        })
        .catch(err => {
            console.log(err.message);
        });
}

export function addPost(dispatch, data, callback) {
    axios.post(`/api/share`, data)
        .then(response => {
            const {data} = response;
            if (data.success) {
                return callback(null, true);
            } else {
                const msg = data.message; 
                dispatch(setToast({
                    type: 'failure',
                    message: msg
                }));
                return callback(true);
            }
        });
}

export function getPosts(dispatch, callback) {
    axios.get('/api/posts')
        .then(response => {
            const {data} = response;
            if (data.success) {
                callback(null, data.data);
            }
        })
        .catch(err => {
            console.log(err.message);
        });
}

export function checkSession(dispatch) {
    axios.get('/api/session')
        .then(response => {
            dispatch(handleLoginResponse(response));
        })
        .catch(err => {
            // console.log(err.message);
        });
}

export function fetchSession(dispatch, callback) {
    axios.get('/api/session')
        .then(response => {
            dispatch(handleLoginResponse(response));
            return callback(null, true);
        })
        .catch(err => {
            // console.log(err.message);
            return callback(true);
        });
}


export function uploadImageToCloud(file) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('cloud_name', 'dylqg3itm')
    formData.append('upload_preset', 'ld9mmcgj')

    return axios.post(
      'https://api.cloudinary.com/v1_1/dylqg3itm/image/upload',
      formData
    );
}