import React from 'react'

const TeamMember = props => {
  return (
    <div className="member">
      <img src={props.memberImage} alt={props.memberImageAlt} />
      <p className="memberName">{props.memberName}</p>
      <p>{props.memberPosition}</p>
      <p>{props.memberLinkedin}</p>
    </div>
  )
}

export default TeamMember
