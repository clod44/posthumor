import { createContext, useContext, useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import axios from 'axios';

const CloudinaryContext = createContext();

export const useCloudinary = () => {
    return useContext(CloudinaryContext);
};

export const cld = new Cloudinary({
    cloud: {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    },
});

export const CloudinaryProvider = ({ children }) => {
    const [uploadProgress, setUploadProgress] = useState(0);


    const uploadImage = async (file) => {
        setUploadProgress(0);
        const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`;
        const formData = new FormData();

        console.log(file);  // Ensure file is valid
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_POST_UPLOAD_PRESET);
        formData.append('resource_type', 'image');

        // Log formData to check the appended fields
        for (let pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        try {
            const response = await axios.post(url, formData, {
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                        setUploadProgress(progress);
                    }
                },
            });
            return response.data.public_id;
        } catch (error) {
            console.error('Error uploading image:', error.response ? error.response.data : error);
            return null;
        }
    };



    return (
        <CloudinaryContext.Provider value={{ uploadImage, uploadProgress }}>
            {children}
        </CloudinaryContext.Provider>
    );
};
