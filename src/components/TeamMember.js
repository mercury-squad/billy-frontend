import React from 'react'

const TeamMember = props => {
  return (
    <div>
      <img src={props.memberImage} alt={props.memberImageAlt} />
      <p>{props.memberName}</p>
      <p>{props.memberPosition}</p>
      <p>{props.memberLinkedin}</p>
    </div>
  )
}

export default TeamMember
