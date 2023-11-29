"use client"

import React from 'react'
import { useGlobalState } from '../Context/GlobalProvider'
import Tasks from '../Components/tasks/Tasks'
const page = () => {
  const {importantTasks} = useGlobalState()
  return (
    <Tasks title='Important Tasks' tasks={importantTasks}></Tasks>
  )
}

export default page