import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import TaskModal from '../Modal/TaskModal';
import TeamSidebar from '../Sidebar/TeamSidebar';
import './Homepage.css';

const initialTasks = {
    todo: [
        { id: '1', title: 'Install Flask', assignee: 'Jiena Wu', priority: 'High' },
        { id: '2', title: 'Setup MongoDB', assignee: 'Ruimeng Zhang', priority: 'Medium' },
    ],
    inProgress: [],
    done: [],
};

const Homepage = () => {
    const [tasks, setTasks] = useState(initialTasks);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentColumn, setCurrentColumn] = useState('');
    const [taskToEdit, setTaskToEdit] = useState(null); // Task to be edited
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    // Toggle login/logout
    const toggleLogin = () => {
        if (isLoggedIn) {
            setIsLoggedIn(false);
            alert('You have logged out!');
        } else {
            navigate('/login');
        }
    };

    // Handle drag and drop
    const onDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination } = result;

        const sourceColumn = [...tasks[source.droppableId]];
        const destinationColumn = [...tasks[destination.droppableId]];

        const [movedTask] = sourceColumn.splice(source.index, 1);
        destinationColumn.splice(destination.index, 0, movedTask);

        setTasks({
            ...tasks,
            [source.droppableId]: sourceColumn,
            [destination.droppableId]: destinationColumn,
        });
    };

    // Add or update task
    const handleAddOrUpdateTask = (updatedTask) => {
        if (taskToEdit) {
            // Update existing task
            const updatedColumn = tasks[currentColumn].map((task) =>
                task.id === updatedTask.id ? updatedTask : task
            );
            setTasks({ ...tasks, [currentColumn]: updatedColumn });
        } else {
            // Add new task
            setTasks({
                ...tasks,
                [currentColumn]: [...tasks[currentColumn], updatedTask],
            });
        }
        setIsModalOpen(false);
        setTaskToEdit(null); // Reset taskToEdit
    };

    // Delete a task
    const handleDeleteTask = (columnId, taskId) => {
        const updatedColumn = tasks[columnId].filter((task) => task.id !== taskId);
        setTasks({
            ...tasks,
            [columnId]: updatedColumn,
        });
    };

    // Edit a task
    const handleEditTask = (columnId, task) => {
        setCurrentColumn(columnId);
        setTaskToEdit(task); // Set the task to be edited
        setIsModalOpen(true);
    };

    return (
        <div className="homepage">
            {/* Header */}
            <header className="homepage-header">
                <h1>Project Name</h1>
                <button onClick={toggleLogin}>
                    {isLoggedIn ? 'Log Out' : 'Log In'}
                </button>
            </header>

            {/* Main Content */}
            <div className="main-content">
                <DragDropContext onDragEnd={onDragEnd}>
                    {Object.keys(tasks).map((columnId) => (
                        <Droppable droppableId={columnId} key={columnId}>
                            {(provided) => (
                                <div
                                    className={`column column-${columnId}`}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {/* Column Title */}
                                    <div className="column-title">
                                        <span
                                            className={`status-circle ${
                                                columnId === 'todo'
                                                    ? 'todo'
                                                    : columnId === 'inProgress'
                                                        ? 'inprogress'
                                                        : 'done'
                                            }`}
                                        ></span>
                                        <h2>{columnId.toUpperCase()}</h2>
                                    </div>

                                    {/* Task Cards */}
                                    {tasks[columnId].map((task, index) => (
                                        <Draggable key={task.id} draggableId={task.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    className="task-card"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <h4>{task.title}</h4>
                                                    <p>Assigned to: {task.assignee}</p>
                                                    <span
                                                        className={`priority-tag ${
                                                            task.priority === 'High'
                                                                ? 'priority-high'
                                                                : task.priority === 'Medium'
                                                                    ? 'priority-medium'
                                                                    : 'priority-low'
                                                        }`}
                                                    >
                                                        {task.priority}
                                                    </span>
                                                    {/* Edit and Delete Buttons */}
                                                    <div className="task-actions">
                                                        <button
                                                            className="edit-task"
                                                            onClick={() => handleEditTask(columnId, task)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="delete-task"
                                                            onClick={() => handleDeleteTask(columnId, task.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                    {/* Add Item Button */}
                                    <button
                                        className="add-item"
                                        onClick={() => {
                                            setCurrentColumn(columnId);
                                            setIsModalOpen(true);
                                            setTaskToEdit(null); // Reset taskToEdit
                                        }}
                                    >
                                        + Add Item
                                    </button>
                                </div>
                            )}
                        </Droppable>
                    ))}
                </DragDropContext>
                {/* Task Modal */}
                <TaskModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setTaskToEdit(null); // Reset taskToEdit on close
                    }}
                    onSubmit={handleAddOrUpdateTask}
                    taskToEdit={taskToEdit} // Pass the task to edit, if any
                    teamMembers={['Jiena Wu', 'Ruimeng Zhang', 'Alex Johnson']} // Team members dropdown options
                />
                {/* Sidebar */}
                <TeamSidebar />
            </div>
        </div>
    );
};

export default Homepage;
