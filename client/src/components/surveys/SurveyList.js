import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './SurveyStyles.css';
class SurveyList extends Component{
    
    componentDidMount() {
        this.props.fetchSurveys();
    }

    renderSurveys(){
        console.log(this.props.surveys)
        return this.props.surveys.reverse().map(survey=>{
           return( <div className="card darken-1" key={survey._id}>
            <div className="card-content">
              <span className="card-title">{survey.title}</span>
              <p>
                  {survey.body}
              </p>
           
            <p className="right">
                Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
    
            </div>
            <div className="card-action bottom-card">
            <div className="card-action-left">
                <div>Yes: {survey.yes}</div>
                <div>No: {survey.no}</div>
            </div>
            <div className="card-action-right">
                <button onClick={() => this.props.deleteSurvey(survey._id, this.props.surveys)} className="btn btn-tiny red right">
                    <i className="material-icons">delete</i>
                </button>
            </div>
            </div>
          </div>
        )})
    }
    render(){
        return (
            <div>
                {this.renderSurveys()}
            </div>
        )
    }
}

function mapStateToProps({surveys}){
    return { surveys};
}

export default connect(mapStateToProps,actions)(SurveyList)
