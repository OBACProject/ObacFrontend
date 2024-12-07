import React from 'react'
import SubjectForm from './Form'
import FilterBar from './menuBar'

export default function page() {
  return (
    <div className="text-xl pl-20">
      <FilterBar/>
      <SubjectForm/>
    </div>
  )
}
