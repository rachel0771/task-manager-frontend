import React, { useState, useEffect } from 'react';
import './TaskModal.css';

const TaskModal = ({ isOpen, onClose, onSubmit, taskToEdit, teamMembers }) => {
    const [title, setTitle] = useState('');
    const [assignees, setAssignees] = useState([]);
    const [priority, setPriority] = useState('Low');
    const [showDropdown, setShowDropdown] = useState(false); // To toggle dropdown visibility

    // Populate form fields if editing a task
    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setAssignees(taskToEdit.assignees || []);
            setPriority(taskToEdit.priority);
        } else {
            setTitle('');
            setAssignees([]);
            setPriority('Low');
        }
    }, [taskToEdit]);

    // Handle submission of the form
    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedTask = {
            id: taskToEdit ? taskToEdit.id : Date.now().toString(), // Keep ID for editing or generate a new ID
            title,
            assignees,
            priority,
        };
        onSubmit(updatedTask);
    };

    // Handle toggling of assignees
    const toggleAssignee = (member) => {
        if (assignees.includes(member)) {
            setAssignees(assignees.filter((assignee) => assignee !== member));
        } else {
            setAssignees([...assignees, member]);
        }
    };

    if (!isOpen) return null; // Don't render the modal if it's not open

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{taskToEdit ? 'Edit Task' : 'Add Task'}</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Task Title:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Assignees:
                        <div className="dropdown-container">
                            <div
                                className="dropdown-header"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                {assignees.length > 0
                                    ? assignees.join(', ')
                                    : 'Select Team Members'}
                                <span className="dropdown-arrow">
                                    {showDropdown ? '▲' : '▼'}
                                </span>
                            </div>
                            {showDropdown && (
                                <div className="dropdown-menu">
                                    {teamMembers.map((member) => (
                                        <div key={member} className="dropdown-item">
                                            <input
                                                type="checkbox"
                                                id={member}
                                                checked={assignees.includes(member)}
                                                onChange={() => toggleAssignee(member)}
                                            />
                                            <label htmlFor={member}>{member}</label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </label>
                    <label>
                        Priority:
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            required
                        >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </label>
                    <div className="modal-buttons">
                        <button type="submit" className="create-button">
                            {taskToEdit ? 'Update Task' : 'Create Task'}
                        </button>
                        <button type="button" className="cancel-button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;
