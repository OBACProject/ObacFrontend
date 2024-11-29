import React from 'react'
import SubjectForm from './subjectForm'
import FilterBar from './filterBar'

export default function page() {
  return (
    <div className="text-xl pl-20">
      <FilterBar/>
      <SubjectForm/>
    </div>
  )
}
