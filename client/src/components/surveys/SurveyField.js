import React from 'react';

export default ({ input, label, meta: {error, touched }}) =>{
    
    return (
        <div>
            <label>{label} </label>
            <input {...input} style={{marginBottom:'5px' }}/>
            <div className="red-text" style={{marginBottom: '20px'}}>
                {touched && error}
            </div>
            
        </div>
        //{touched && error} if touched is false the enteriment state won't be executed
        // if touched ==true it will return the error string
    )
}