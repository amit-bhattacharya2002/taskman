"use client"
import { useGlobalState } from '@/app/Context/GlobalProvider'
import React from 'react'
import styled from "styled-components"
import CreateContent from '../models/CreateContent'
import EditContent from '../models/EditContent'
import TaskItem from '../taskItem/TaskItem'
import { plus } from '@/app/utils/Icons'
import Modal from '../models/Modal'


interface Props{
    title: string;
    tasks: any[];

}
const Tasks = ({title, tasks} : Props) => {

    const { theme, openModal, modal, editModal, openEditModal } = useGlobalState();
  return (
    <TaskStyled theme={theme}>
        {modal && <Modal content={<CreateContent/>}></Modal>}
        

        <h1>{title}</h1>
        <div className="tasks grid mt-5">
            {
                tasks.map((task)=> (
                    <TaskItem 
                        key={task.id} 
                        title={task.title}
                        description={task.description}
                        date={task.date}
                        isCompleted={task.isCompleted}
                        id={task.id}
                    />
                ))
            }

            <button className='create-task' onClick={openModal}>
                {plus}
                Add New Task
            </button>
        </div>

    </TaskStyled>
  )
}

const TaskStyled = styled.main`
    
    width: 100%;
    background-color: ${(props) => props.theme.colorBg2};
    border : 2px solid ${(props)=> props.theme.borderColor2};
    border-radius: 0.25rem;
    padding: 2rem;
    height: 100%;

    @media only screen and (max-width: 375px){ 
        padding: 1rem;
    }
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 0.5rem;
    }

    >h1{
        font-size: clamp(1.5rem, 2vw, 2rem);
        font-weight: 800;
        position: relative;

        &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 3rem;
            height: 0.2rem;
            background-color: ${(props) => props.theme.colorPrimaryGreen};
            border-radius: 0.5rem;
        }
    }


    .create-task{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;

        height: 16rem;

        color:${(props) => props.theme.colorGrey2};
        font-weight: 600;
        cursor: pointer;
        border-radius: 1rem;
        border: 3px dashed ${(props) => props.theme.colorGrey5};
        transition: all 0.5s ease;
        &:hover {
        background-color: ${(props) => props.theme.colorGrey5};
        color: ${(props)=> props.theme.colorGrey1}
        }
    }
`
export default Tasks