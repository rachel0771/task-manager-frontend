import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Replace with your backend URL
    timeout: 5000,
});

// User authentication
export const login = async (credentials) => {
    try {
        const response = await api.post('/login', credentials);
        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

export const register = async (userData) => {
    try {
        const response = await api.post('/register', userData);
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
};

// Task management
export const getTasks = async (filters) => {
    try {
        const response = await api.get('/tasks', { params: filters });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
        throw error;
    }
};

export const createTask = async (taskData) => {
    try {
        const response = await api.post('/tasks', taskData);
        return response.data;
    } catch (error) {
        console.error('Failed to create task:', error);
        throw error;
    }
};

export const updateTask = async (taskId, updates) => {
    try {
        const response = await api.put(`/tasks/${taskId}`, updates);
        return response.data;
    } catch (error) {
        console.error('Failed to update task:', error);
        throw error;
    }
};

export const deleteTask = async (taskId) => {
    try {
        const response = await api.delete(`/tasks/${taskId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to delete task:', error);
        throw error;
    }
};

export default {
    login,
    register,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};
