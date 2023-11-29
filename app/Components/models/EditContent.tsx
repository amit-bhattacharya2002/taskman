import { useGlobalState } from '@/app/Context/GlobalProvider';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { styled } from 'styled-components';

interface EditContentProps {
    taskId: string; 
  }

const EditContent: React.FC<EditContentProps> = ({ taskId }) => {
    const [originalTask, setOriginalTask] = useState({});
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [completed, setCompleted] = useState(false);
    const [important, setImportant] = useState(false);
    const { theme, allTasks, closeModal } = useGlobalState();

    useEffect(() => {
        // Fetch the original task data using taskId
        const fetchOriginalTask = async () => {
            try {
                const res = await axios.get(`/api/tasks/${taskId}`);
                if (res.data.error) {
                    toast.error(res.data.error);
                } else {
                    const originalTaskData = res.data.task;
                    setOriginalTask(originalTaskData);
                    // Set the initial state with the original task data
                    setTitle(originalTaskData.title);
                    setDescription(originalTaskData.description);
                    setDate(originalTaskData.date);
                    setCompleted(originalTaskData.completed);
                    setImportant(originalTaskData.important);
                }
            } catch (error) {
                toast.error("Something went wrong");
                console.log(error);
            }
        };

        fetchOriginalTask();
    }, [taskId]);

    const handleChange = (name : string) => (e : any) => {
        switch (name) {
            case "title":
                setTitle(e.target.value);
                break;
            case "description":
                setDescription(e.target.value);
                break;
            case "date":
                setDate(e.target.value);
                break;
            case "completed":
                setCompleted(e.target.checked);
                break;
            case "important":
                setImportant(e.target.checked);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e : any) => {
        e.preventDefault();

        const updatedTask = {
            title,
            description,
            date,
            completed,
            important,
        };

        try {
            // Use the taskId to update the task
            const res = await axios.put(`/api/tasks/${taskId}`, updatedTask);

            if (res.data.error) {
                toast.error(res.data.error);
            } else {
                allTasks();
                closeModal();
                toast.success("Task updated successfully");
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    };
    
  return (
    <CreateContentStyled onSubmit={handleSubmit} theme={theme}>
        <h1>Create a Task</h1>
        <div className="input-control">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" value={title} onChange={handleChange("title")} placeholder='Task name'/>
        </div>

        <div className="input-control">
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description" value={description} onChange={handleChange("description")} placeholder='Task description' rows={4}/>
        </div>

        <div className="input-control">
            <label htmlFor="date">Date</label>
            <input type="date" name="date" id="date" value={date} onChange={handleChange("date")} />
        </div>

        <div className="input-control toggle">
            <label htmlFor="completed">Completed</label>
            <input type="checkbox" name="completed" id="completed" value={completed.toString()} onChange={handleChange("completed")} placeholder='Task name'/>
        </div>

        <div className="input-control toggle">
            <label htmlFor="important">Important</label>
            <input type="checkbox" name="important" id="important" value={important.toString()} onChange={handleChange("important")} placeholder='Task name'/>
        </div>

        <div className={`submit-btn bg-[#27AE60] p-4 border rounded-lg border-y-emerald-900 border-x-emerald-700`}>
            <button type='submit' className='w-full'>
                <span>Create Task</span>
            </button>
        </div>
    </CreateContentStyled>
  )
}

const CreateContentStyled = styled.form`
    /* Styling the create content page */
    >h1{
        font-size: clamp(1.2rem, 5vw, 1.6rem);
        font-weight: 600;

    }


    border-radius: ${(props)=> props.theme.borderRadiusMd2};
    color: ${(props)=> props.theme.colorGrey1};


    .input-control{
        position: relative;
        margin: 1.6rem 0;
        font-weight: 500;
        label{
            margin-bottom: 1rem;
            display: inline-block;
            font-size: clamp(0.9rem, 5vw, 1.2rem);

            span{
                color: ${(props) => props.theme.colorGrey3};
            }
        }
        input, textarea{
            width: 100%;
            /* border: none; */
            padding: 1rem;
            resize: none;

            background-color: ${(props)=> props.theme.colorGreyDark};
            color: ${(props)=> props.theme.colorGrey2};
            border-radius: 0.5rem;
        }
    }

    .toggle{
        display: flex;
        align-items: center;
        justify-content: space-between;

        label{
            flex:1;
            margin: auto;
        }
        input{
            width: initial;
        }
    }
`
export default EditContent;