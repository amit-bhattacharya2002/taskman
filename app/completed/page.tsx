"use client"
import React from 'react'
import { useGlobalState } from '../Context/GlobalProvider'
import Tasks from '../Components/tasks/Tasks';
const page = () => {

  const {completedTasks} = useGlobalState();
  return (
    <Tasks title='Completed Tasks' tasks={completedTasks}></Tasks>
  )
}

export default page