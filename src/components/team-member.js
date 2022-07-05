import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const TeamMember = (props) => {
  return (
    <div className="member">
      <div className="image-container">
        <img src={props.memberImage} alt={props.memberImageAlt} />
        <a href={props.memberLinkedin}><FontAwesomeIcon icon={faLinkedinIn} className="fa-icon"/></a>
      </div>
      <p className="member-name">{props.memberName}</p>
      <p className="smaller-text">{props.memberPosition}</p>
    </div>
  )
}

export default TeamMember;
