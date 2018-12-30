import React from 'react';


export function ProfilePic(props){
    if(!props.id){
        return <img src="practice-cartoon.png"/>;
    }
    else{
        console.log('props.image_url:', props.image);
        const image = props.image || '/logo.png';

        return(
            <div className="image_container">
                <img id="profile_image" onClick={props.clickHandler} src={image}/>
            </div>
        );
    }
}
