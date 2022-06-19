import React from 'react';


const feature = props => {
  return (
    <div>
      <img src={props.imgPath} alt={props.imgAlt} />
      <div>
        <h2>{props.title}</h2>
        <p>{props.text}</p>
      </div>
    </div>
  )
}

export default feature
