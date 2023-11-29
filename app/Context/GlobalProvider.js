"use client"

import React, {createContext, useState, useContext} from 'react'
import themes from "./themes";
import axios from 'axios';
import { toast } from 'react-hot-toast';
export const GlobalContext = createContext();

export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {

    const [selectedTheme, setSelectedTheme] = useState(0)
    const [isLoading, setIsLoading] = useState(false)


    const theme = themes[selectedTheme]
    const [tasks, setTasks] = useState([])

    const [modal, setModal] = useState(false)
    const [editModal, setEditModal] = useState(false)

    const [collapsed, setCollapsed] = useState(false)

    const collapseMenu = ()=>{
        setCollapsed(!collapsed)
    }
    const openModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false)
    }

    const openEditModal = () => {
        setModal(true);
    }

    const closeEditModal = () => {
        setModal(false)
    }

    const allTasks = async () => {
        setIsLoading(true);
        try{
            const res = await axios.get("/api/tasks");
            const sorted = res.data.sort((a, b)=>{
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            })
            setTasks(sorted);
            setIsLoading(false);
        }catch(error){
            console.log(error);
            // toast.error("Something went wrong")
        }
    }

    const deleteTask = async (id) =>{
        try{
            const res = await axios.delete(`/api/tasks/${id}`)
            toast.success("Task deleted");

            allTasks();
        }catch(error){
            console.error(error)
            toast.error("Something went wrong")
        }
    }

    // const editTask = async (id) =>{
    //     try{
    //         const res = await axios.put(`/api/tasks/${id}`)
    //         toast.success("Task deleted");

    //         allTasks();
    //     }catch(error){
    //         console.error(error)
    //         toast.error("Something went wrong")
    //     }
    // }

    const updateTask = async(task) => {
        try {
            const res = await axios.put('/api/tasks', task)
            toast.success("Task updated")
            allTasks()
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    const completedTasks = tasks.filter((task) => task.isCompleted === true)
    const importantTasks = tasks.filter((task) => task.isImportant === true)
    const incompleteTasks = tasks.filter((task) => task.isCompleted === false)


    React.useEffect(() => {
        allTasks()
    },[])
    return (
        <GlobalContext.Provider value={{
            theme,
            tasks,
            deleteTask,
            completedTasks,
            importantTasks,
            incompleteTasks,
            updateTask,
            modal,
            openModal,
            closeModal,
            allTasks,
            collapsed,
            collapseMenu,
            editModal,
            openEditModal,
            closeEditModal,
            
        }}>

            <GlobalUpdateContext.Provider value={{}}>
                {children}
            </GlobalUpdateContext.Provider>

        </GlobalContext.Provider>
    )
}

export const useGlobalState = () => useContext(GlobalContext)
export const useGlobalUpdate = () => useContext(GlobalUpdateContext)
