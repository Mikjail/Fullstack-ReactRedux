import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class Landing extends Component{

    renderContent() {
        const {auth} = this.props;
        switch(auth){
        case null:
            return;
        case false:
            return <p>Sign in to create surveys</p>
            default:
            return <Link className="btn" to='/surveys'> Create Surveys </Link>
        }
    }

    render() {
        return (
            <div style={{ textAlign:"center"}}>
                <h1>
                    Emaily
                </h1>
                
                {this.renderContent()}
            </div>
            );
    }

   
}

function mapStateToProp({ auth }){
    return { auth };
}

export default connect(mapStateToProp)(Landing);