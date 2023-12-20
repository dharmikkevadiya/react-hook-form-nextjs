"use client"
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ToastContainer, toast,  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  bio: string;
  gender: 'Male' | 'Female' | 'Other';
  termsAndConditions: boolean;
  showPassword: boolean;
};

const RegisterForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<FormData>();

  const password = watch('password');

  // onSumbit
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success('Registration successful!');
      reset();
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
          Username
        </label>
        <input
          {...register('username', { required: true, minLength: 3, maxLength: 15, pattern: /^[a-zA-Z0-9_]+$/ })}
          type="text"
          id="username"
          className={`mt-1 p-2 w-full border rounded-md ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Enter your username"
        />
        {errors.username && (
          <span className="text-xs text-red-500">Username must be 3-15 characters, alphanumeric including underscores.</span>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
          Email Address
        </label>
        <input
          {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
          type="email"
          id="email"
          className={`mt-1 p-2 w-full border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="example@domain.com"
        />
        {errors.email && (
          <span className="text-xs text-red-500">Enter a valid email address.</span>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
          Password
        </label>
        <div className="relative">
          <input
            {...register('password', { required: true, minLength: 8, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/ })}
            type={showPassword ? 'text' : 'password'}
            id="password"
            className={`mt-1 p-2 w-full border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        {errors.password && (
          <span className="text-xs text-red-500">Password must be at least 8 characters and include uppercase, lowercase, number, and special character.</span>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
          Confirm Password
        </label>
        <input
          {...register('confirmPassword', { required: true, validate: value => value === password })}
          type="password"
          id="confirmPassword"
          className={`mt-1 p-2 w-full border rounded-md ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.confirmPassword && (
          <span className="text-xs text-red-500">Passwords do not match.</span>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-600">
          Date of Birth
        </label>
        <input
          {...register('dateOfBirth', { required: true })}
          type="date"
          id="dateOfBirth"
          className={`mt-1 p-2 w-full border rounded-md ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.dateOfBirth && (
          <span className="text-xs text-red-500">Date of Birth is required.</span>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="bio" className="block text-sm font-medium text-gray-600">
          Bio
        </label>
        <textarea
          {...register('bio', { maxLength: 300 })}
          id="bio"
          className={`mt-1 p-2 w-full border rounded-md ${errors.bio ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Write a brief bio (max 300 characters)"
        />
        {errors.bio && (
          <span className="text-xs text-red-500">Bio should be less than 300 characters.</span>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Gender</label>
        <div>
          <input
            {...register('gender', { required: true })}
            type="radio"
            value="Male"
            id="genderMale"
          />
          <label htmlFor="genderMale" className="ml-2 mr-4 text-sm text-white">
            Male
          </label>
          <input
            {...register('gender', { required: true })}
            type="radio"
            value="Female"
            id="genderFemale"
          />
          <label htmlFor="genderFemale" className="ml-2 mr-4 text-sm text-white">
            Female
          </label>
          <input
            {...register('gender', { required: true })}
            type="radio"
            value="Other"
            id="genderOther"
          />
          <label htmlFor="genderOther" className="ml-2 text-sm text-white">
            Other
          </label>
        </div>
        {errors.gender && <span className="text-xs text-red-500">Gender is required.</span>}
      </div>

      <div className="mb-4">
        <input
          {...register('termsAndConditions', { required: true })}
          type="checkbox"
          id="termsAndConditions"
          className={`mr-2 ${errors.termsAndConditions ? 'border-red-500' : ''}`}
        />
        <label htmlFor="termsAndConditions" className="text-sm font-medium text-gray-600">
          I agree to the Terms and Conditions
        </label>
        <div>
          {errors.termsAndConditions && (
            <span className="text-xs text-red-500">Terms and Conditions must be accepted.</span>
          )}
       </div>
      </div>

      <div className="mb-4">
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 relative"
          disabled={isLoading}
        >
          {isLoading && (
            <span className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
            </span>
          )}
          Register
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default RegisterForm;
