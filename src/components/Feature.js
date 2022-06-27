import React from 'react';


const feature = props => {
  return (
    <div className="feature">
      <img src={props.imgPath} alt={props.imgAlt} />
      <div>
        <h2>{props.title}</h2>
        <p className="body-regular">{props.text}</p>
      </div>
    </div>
  )
}

export default feature
