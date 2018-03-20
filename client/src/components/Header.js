import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
    
    renderContent() {
        console.log(this.props.auth)
        const { auth } = this.props;
        switch(auth){
            case null:
            return;
            case false:
            return <li><a href="/auth/google"> Login With Google </a></li>
            default:
            return [
                <li key="1"><Payments /> </li>,
                <li key="3"style={{margin:'0 10px'}}> Credits:{this.props.auth.credits}</li>,
                <li key="2"><a href="/api/logout">Logout </a></li>
            ];
        }
    }   

    render(){
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link 
                    to={this.props.auth?'/surveys':'/'} 
                    className="left brand-logo"
                    >
                        Emaily
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                     </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProp({ auth }){
    return { auth };
}

export default connect(mapStateToProp)(Header);