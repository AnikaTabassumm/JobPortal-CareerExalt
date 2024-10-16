
import React from 'react'
import CandidateProfile from '../../components/CandidateProfile';

const page = ({params}) => {
    const { id } = params;
  return (
    <div><CandidateProfile id={id} /></div>
  )
}

export default page