import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const getAxiosApi = async (path) => {
    try {
        const response = await axios.get(path);
        if (response && response.data.statusCode === 200) {
            toast.success(response.data.successMessage, { autoClose: 2000 });
        } else {
            toast.error('Failed to fetch employees');
        }
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Server Error...');
        throw error; // Re-throw the error to handle higher up if needed
    }
};

const postAxiosApi = async (path, payload) => {
    try {
        const response = await axios.post(path, payload);
        if (response && response.data.statusCode === 200) {
            toast.success(response.data.successMessage, { autoClose: 2000 });
        } else {
            // Handle non-200 responses
            toast.error(response && response.errorMessage);
        }
        return response;
    } catch (error) {
        console.error('Error posting data:', error);
        toast.error('Failed to create employee');
        throw error; // Re-throw the error to handle higher up if needed
    }
};

const AxiosApi = async (path, req, payload = {}) => {
    try {
        if (req === "get") {
            const response = await getAxiosApi(path);
            return response;
        } else if (req === "post") {
            const response = await postAxiosApi(path, payload);
            return response;
        } else {
            throw new Error('Invalid request type');
        }
    } catch (error) {
        console.error('AxiosApi error:', error);
        throw error; // Re-throw the error to handle higher up if needed
    }
};

export default AxiosApi;