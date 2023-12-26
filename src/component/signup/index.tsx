import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'; // Import yup
import GenderInput from '@/component/genderInput';

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

// Convert zod schema to yup schema
const yupValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(15, 'Username must be at most 15 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain uppercase, lowercase, number, and special character'
    ),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords do not match'),
  dateOfBirth: yup.date().required('Birth Date is required').min(new Date('2005-12-31'), 'Must be 18 years or older'),
  bio: yup.string().max(300, 'Bio must be at most 300 characters'),
  gender: yup.string().required('Gender is required').oneOf(['Male', 'Female', 'Other'], 'Gender is required'),
  termsAccepted: yup.boolean().required('Terms and conditions must be accepted'),
});

const Form = () => {
  const { register, control, watch, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(yupValidationSchema),
  });
  
  const selectedGender = watch('gender');
  const acceptTerms = watch('termsAccepted');
  

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
  };
  return (
    <>

      <section className="shadow-2xl shadow bg-gray-100">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">

          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your UserName
                  </label>
                  <input
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="name@company.com"
                    {...register('username')}
                  />
                  {errors.username && <span className="text-red-500 text-xs">{errors.username.message}</span>}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="name@company.com"
                    {...register('email')}
                  />
                  {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    {...register('password')}
                  />
                  {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    placeholder="••••••••"
                    {...register('confirmPassword')}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  />
                  {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>}
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Select BirthDate
                  </label>
                  <div className="relative max-w-sm">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                      </svg>
                    </div>
                    <Controller
                      name="dateOfBirth"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="date"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                          placeholder="Select date"
                        />
                      )}
                    />
                  </div>
                  {errors.dateOfBirth && <span className="text-red-500 text-xs">{errors.dateOfBirth.message}</span>}
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Gender
                  </label>
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: 'Gender is required' }}
                    render={({ field }) => (
                      <GenderInput value={selectedGender} onChange={(value) => field.onChange(value)} />
                    )}
                  />
                 {errors.gender && <span className="text-red-500 text-xs">{errors.gender.message}</span>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    {...register('bio')}
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="Write your Bio here..."
                  />
                  {errors.bio && <span className="text-red-500 text-xs">{errors.bio.message}</span>}
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    {/* Using Controller to integrate with react-hook-form */}
                    <Controller
                      name="termsAccepted"
                      control={control}
                      defaultValue={false} // Set a default value if needed
                      rules={{ required: 'You must accept the terms and conditions' }} // Add validation rules
                      render={({ field }) => (
                        <input
                          {...field}
                          id="termsAccepted"
                          aria-describedby="termsAccepted"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        />
                      )}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="termsAccepted" className="font-light text-gray-700">
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>

                {acceptTerms === false && (
                  <span className="text-red-500">Please accept the terms and conditions</span>
                )}
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Form;
