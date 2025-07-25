import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:8080' 
    : '';

export const getTasks = () => {
    try {
        return axios.get(`${BASE_URL}/api/tasks`);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
}

export const addTask = (task) => {
    try {
        return axios.post(`${BASE_URL}/api/tasks`, task, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Error adding task:", error);
        throw error;
    }
}

export const removeTask = (task) => {
    try {
        return axios.delete(`${BASE_URL}/api/tasks`, {
            data: task,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Error removing task:", error);
        throw error;
    }
}