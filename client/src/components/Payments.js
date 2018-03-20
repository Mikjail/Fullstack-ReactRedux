import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import *  as actions from '../actions'; 
class Payments extends Component {
    
    render() {
        return (
            //represented in cents -> 500 cents = 5 usd
            <StripeCheckout
                name="Emaily"
                description="5$ for 5 emails"
                amount={500}
                token={token=> this.props.handleToken(token)}
                stripeKey ={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">
                    Add Credits
                </button>
            </StripeCheckout>
        )
    }
}

export default connect(null, actions)(Payments);