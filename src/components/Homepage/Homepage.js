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
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state
    const navigate = useNavigate();

    const toggleLogin = () => {
        if (isLoggedIn) {
            setIsLoggedIn(false); // Log out
            alert('You have logged out!');
        } else {
            navigate('/login'); // Redirect to login
        }
    };

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

    const handleAddTask = (newTask) => {
        setTasks({
            ...tasks,
            [currentColumn]: [...tasks[currentColumn], newTask],
        });
        setIsModalOpen(false);
    };

    return (
        <div className="homepage">
            {/* Top Navigation */}
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
                                        }}
                                    >
                                        + Add Item
                                    </button>
                                </div>
                            )}
                        </Droppable>
                    ))}
                </DragDropContext>
                {/* Team Sidebar */}
                <TeamSidebar />
            </div>
            {/* Task Modal */}
            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddTask}
            />
        </div>
    );
};

export default Homepage;
