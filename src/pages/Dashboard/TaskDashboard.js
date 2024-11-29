import React, { useState, useEffect } from 'react';
import TaskList from '../../components/Task/TaskList';
import TaskFilter from '../../components/Task/TaskFilter';
import TaskModal from '../../components/Modal/TaskModal';
import api from '../../services/api';
import './Dashboard.css';

const TaskDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState({});

    // Fetch tasks from the backend
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.get('/tasks', { params: filter });
                setTasks(response.data.tasks);
            } catch (err) {
                console.error(err);
                alert('Failed to fetch tasks');
            }
        };
        fetchTasks();
    }, [filter]);

    // Add a new task
    const handleAddTask = async (newTask) => {
        try {
            const response = await api.post('/tasks', newTask);
            setTasks([...tasks, response.data.task]);
        } catch (err) {
            console.error(err);
            alert('Failed to add task');
        }
    };

    // Update task status
    const handleStatusChange = async (taskId, status) => {
        try {
            const response = await api.put(`/tasks/${taskId}`, { status });
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? { ...task, status: response.data.status } : task
                )
            );
        } catch (err) {
            console.error(err);
            alert('Failed to update task status');
        }
    };

    return (
        <div className="dashboard">
            <TaskFilter onFilterChange={(key, value) => setFilter({ ...filter, [key]: value })} />
            <TaskList tasks={tasks} onStatusChange={handleStatusChange} />
            <button onClick={() => setIsModalOpen(true)}>+ Item</button>
            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddTask}
            />
        </div>
    );
};

export default TaskDashboard;
