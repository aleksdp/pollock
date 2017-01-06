import {fetchData, Auth} from 'react-security-fetcher'
import { SubmissionError } from 'redux-form'

export const login = (form) => async (dispatch) => {
    try{
        const response = await fetchData('/login_check', 'POST', {params: form})
        Auth.setToken(response.token)
        Auth.setRefreshToken(response.refreshToken)
        await dispatch(getAccount())
        dispatch({
            type: 'LOGIN_SUCCESS'
        })
    }
    catch (e) {
        dispatch({
            type: 'LOGIN_ERROR',
            payload: e
        })
        throw new SubmissionError({_error: e.message})
    }
}

export const getAccount = () => async (dispatch) => {
    if(!Auth.isAuthenticated()){
        return;
    }
    try{
        const response = await fetchData('/users-self', 'GET')
        dispatch({
            type: 'ACCOUNT_SUCCESS',
            payload: response
        })
    }
    catch (e){
        dispatch({
            type: 'ACCOUNT_ERROR',
            payload: e.error
        })
        throw e
    }
}

export const logout = () => (dispatch) => {
    Auth.logout()
    dispatch({
        type: 'LOGOUT_SUCCESS'
    })
}


export const register = (form) => async (dispatch) => {
    try{
        const response = await fetchData('/users', 'POST', {
            params: {...form, plainPassword: form.password, password: undefined, password1: undefined}
        })
        dispatch({
            type: 'REGISTER_SUCCESS'
        })
        return response
    }
    catch (e){
        dispatch({
            type: 'REGISTER_ERROR',
            payload: e.error
        })
        throw new SubmissionError({_error: 'неизвестная ошибка :('})
    }
}
