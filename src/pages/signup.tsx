import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod'; // Example alias
import { ref } from 'zod';
import { yupResolver } from '@hookform/resolvers/yup'; // Using Yup for validation

interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    dateOfBirth: Date;
    bio: string;
    gender: string;
    termsAccepted: boolean;
}

const validationSchema = z.object({
    username: z
        .string()
        .nonempty('Username is required')
        .min(3, 'Username must be at least 3 characters')
        .max(15, 'Username must be at most 15 characters')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    email: z.string().email('Invalid email format').nonempty('Email is required'),
    password: z
        .string()
        .nonempty('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must contain uppercase, lowercase, number, and special character'
        ),
    confirmPassword: z.string().nonempty().oneOf([ref('password'), null]),
    dateOfBirth: z.date().min(new Date('1944-12-31'), 'Must be 18 years or older'),
    bio: z.string().max(300, 'Bio must be at most 300 characters'),
    gender: z.enum(['Male', 'Female', 'Other']).nonempty('Gender is required'),
    termsAccepted: z.boolean().nonempty('Terms and conditions must be accepted'),
});

const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(validationSchema),
    });
    const [formData, setFormData] = useState<FormData>({});

    const onSubmit = (data: FormData) => {
        console.log('Form submitted:', data); // Handle form submission logic here
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto">
            <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    {...register('username')}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.username && <span className="text-red-500 text-xs">{errors.username.message}</span>}
            </div>
            {/* Render other fields with similar structure, applying Tailwind CSS classes for styling */}

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Submit
            </button>

        </form>
    );
};

export default Form;
