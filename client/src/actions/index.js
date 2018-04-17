import axios from 'axios';
import {FETCH_USER, FETCH_SURVEYS} from './types';
import _ from 'lodash';

export const fetchUser = () => async (dispatch) => {
        const res = await axios.get('/api/current_user')
        dispatch({ type: FETCH_USER, payload: res.data});
};

// Another way
// export const fetchUser = () => async (dispatch) => {
//     dispatch({ type: FETCH_USER, payload: await axios.get('/api/current_user')});
// };

export const handleToken = (token) => async (dispatch)=>  {
        const res= await axios.post('/api/stripe', token);
        dispatch({ type: FETCH_USER, payload: res.data});

}

export const submitSurvey = (values, history) => async dispatch =>{
        const res = await axios.post('/api/surveys', values);

        history.push('/surveys');
        dispatch({ type : FETCH_USER, payload: res.data});
};


//GET SURVEYS
export const fetchSurveys = () => async(dispatch) =>{
        const res= await axios.get('/api/surveys');
        dispatch({ type: FETCH_SURVEYS, payload: res.data});
}

//DELETE SURVEYS
export const deleteSurvey = (id, surveys) => async(dispatch) =>{
        const res = await axios.delete('/api/surveys', {params: id});
        console.log(res)
        if(res.status == 200){
              dispatch({ type: FETCH_SURVEYS, payload: _.remove(surveys, (survey)=> survey._id != id )})
        }
}



//LOGIN
export const userLoggedIn = (history) => async(dispatch) =>{
        const res= await axios.get('/api/surveys');
        dispatch({ type: FETCH_SURVEYS, payload: res.data});
        history.push('/surveys');
}
