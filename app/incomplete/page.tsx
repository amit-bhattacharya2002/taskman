"use client"
import React from 'react'
import { useGlobalState } from '../Context/GlobalProvider'
import Tasks from '../Components/tasks/Tasks'
const page = () => {
  const {incompleteTasks} = useGlobalState()
  return (
    <Tasks title='Incomplete Tasks' tasks={incompleteTasks}></Tasks>
  )
}

export default page