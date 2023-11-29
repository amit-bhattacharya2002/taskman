import React from 'react'
import { edit,  trash} from '@/app/utils/Icons';
import { styled } from 'styled-components';
import { useGlobalState } from '@/app/Context/GlobalProvider';
import formatDate from '@/app/utils/formatDate'
import Modal from '../models/Modal';
import EditContent from '../models/EditContent';
interface Props{
    title: string;
    description: string;
    date: string;
    isCompleted: boolean;
    id: string;

}
const TaskItem = ({title, description, date, isCompleted,id}: Props) => {
   const {theme, deleteTask, updateTask} = useGlobalState();

   const handleEdit = () =>{
    
   }
  return (
    <TaskItemStyled theme={theme}>

        <h1>
            {title}
        </h1>
        <p>
            Description : 
            {description}
        </p>
        <p className='date'>
            {
            formatDate(date)

            }
        </p>
        <div className="task-footer">
            {isCompleted ? (<button className='completed' onClick={()=>{
                const task = {
                    id,
                    isCompleted: !isCompleted,
                }

                updateTask(task)
            }}>Completed</button>) : (<button className='incompleted' onClick={()=>{
                const task = {
                    id,
                    isCompleted: !isCompleted,
                }

                updateTask(task)
            }}>Incomplete</button>)}

            {/* <button className="edit" onClick={()=>{
                const taskId = id;
                <Modal content={<EditContent taskId={id}/>}></Modal>
            }}>{edit}</button>
             */}
            <button className="delete" onClick={()=>{
                deleteTask(id)
            }}>{trash}</button>
        </div>
    </TaskItemStyled>
  )
}


const TaskItemStyled = styled.div`
    padding: 1.2rem 1rem;
    border-radius: 1rem;
    background-color: ${(props) => props.theme.backgroundColor2};
    box-shadow: ${(props) => props.theme.shadow7};
    border: 2px solid ${(props)=> props.theme.borderColor2};

    height: 16rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .date{
        margin-top: auto;
    }

    >h1{
        font-size: 1.5rem;
        font-weight: 600;

    }

    .task-footer{
        display: flex;
        align-items: center;
        gap: 1.2rem;

        button{
            border: none;
            outline: none;
            cursor: pointer;

            i{
                font-size: 1.4rem;
                color: ${(props) => props.theme.colorGrey2};
            }
        }

        .edit{
            margin-left: auto;
        }

        .completed, .incompleted{
            display: inline-block;
            padding: 0.4rem 1rem;
            background: ${(props) => props.theme.colorDanger};
            border-radius: 30px;
        }

        .completed{
            background-color: ${(props) => props.theme.colorGreenDark};
        }
    }
`
export default TaskItem