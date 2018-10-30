import React from 'react';


export function ProfilePic(props){
    if(!props.id){
        return <img src="practice-cartoon.png"/>
    }
    else{
        console.log('props.image_url:', props.image);
        const image = props.image || '/logo.png'

        return(
            <img className="profilePic" onClick={props.clickHandler} src={image}/>

            // className ="image_title"
        );
    }
}
