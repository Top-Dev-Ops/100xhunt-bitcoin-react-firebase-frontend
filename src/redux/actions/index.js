import { SET_LOADING, STOP_LOADING, SET_UNAUTHENTICATED, SET_USER, LOADING_USER, CLEAR_ERRORS, SET_ERRORS } from '../types';
import axios from 'axios';
import firebase from 'firebase';

firebase.initializeApp({
    apiKey: 'AIzaSyAyuW30JxPlaaXRIawk8nhpxPJU-KfF0p4',
    authDomain: 'coinhunt-server-5014e.firebaseapp.com'
});

export const loginUser = (data, history) => dispatch => {
    dispatch({ type: SET_LOADING });
    axios.post('/login', data).then(res => {
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
        history.push('/');
    }).catch(err => {
        dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
}

export const loginWithGoogle = history => dispatch => {
    dispatch({ type: SET_LOADING });

    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(res => {
        const name = res.user.displayName;
        const photo_url = res.user.photoURL;
        firebase.auth().currentUser.getIdToken().then(idToken => {
            const data = {
                token: idToken,
                uid: res.user.uid,
                email: res.user.email,
                name: name,
                photo_url: photo_url
            };

            axios.post('/loginWithGoogle', data).then(res => {
                setAuthorizationHeader(res.data.token);
                dispatch({
                    type: SET_USER, payload: {
                        credentials: {
                            userId: data.uid,
                            photo_url: data.photo_url,
                            email: data.email,
                            name: data.name,
                            createdAt: new Date().toISOString()
                        }
                    }
                });
                dispatch({ type: CLEAR_ERRORS });
                history.push('/');
            }).catch(err => {
                dispatch({ type: SET_ERRORS, payload: err.response.data });
            });
        }).catch(err => {
            dispatch({ type: SET_ERRORS, payload: err.response.data });
        });
    }).catch(err => {
        console.log(err.code + ' : ' + err.message + ' : ' + err.credential);
    });
}

export const signupUser = (data, history) => dispatch => {
    dispatch({ type: SET_LOADING });

    axios.post('/signup', data).then(res => {
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
        history.push('/');
    }).catch(err => {
        console.log(err);
        dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
}

export const getUserData = () => dispatch => {
    dispatch({ type: LOADING_USER });

    axios.get('/user', { crossDomain: true }).then(res => {
        dispatch({ type: SET_USER, payload: res.data });
    }).catch(err => {
        console.log(err);
    });
}

export const setLoading = () => dispatch => {
    dispatch({ type: SET_LOADING });
}

export const stopLoading = () => dispatch => {
    dispatch({ type: STOP_LOADING });
}

const setAuthorizationHeader = token => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}