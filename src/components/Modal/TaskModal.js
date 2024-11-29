import React, { useState } from 'react';
import './TaskModal.css';

const TaskModal = ({ isOpen, onClose, onSubmit }) => {
    const [taskData, setTaskData] = useState({
        title: '',
        assignee: '',
        priority: 'Low',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({ ...taskData, [name]: value });
    };

    const handleSubmit = () => {
        if (!taskData.title || !taskData.assignee) {
            alert('Title and Assignee are required!');
            return;
        }
        onSubmit(taskData);
        setTaskData({ title: '', assignee: '', priority: 'Low' });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Create New Task</h2>
                <input
                    type="text"
                    name="title"
                    placeholder="Task Title"
                    value={taskData.title}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="assignee"
                    placeholder="Assignee"
                    value={taskData.assignee}
                    onChange={handleChange}
                />
                <select name="priority" value={taskData.priority} onChange={handleChange}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <div className="modal-buttons">
                    <button onClick={handleSubmit}>Create</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
