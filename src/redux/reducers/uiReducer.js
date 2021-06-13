import { SET_LOADING, STOP_LOADING, SET_ERRORS, CLEAR_ERRORS } from '../types';

const initialState = {
    loading: false,
    errors: null
};

export default function uiReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, loading: true };
        case STOP_LOADING:
            return { ...state, loading: false };
        case SET_ERRORS:
            return { ...state, loading: false, errors: action.payload };
        case CLEAR_ERRORS:
            return { ...state, loading: false, errors: null };
        default:
            return state;
    }
}