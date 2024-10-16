'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPackage } from '@/store/slices/packageSlice'; // Adjust the path as necessary

const CreatePackageForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        benefits: '',
        postVisibilityDays: '',
    });

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.packages.loading);
    const error = useSelector((state) => state.packages.error);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(createPackage(formData)).unwrap(); // Unwrap to catch errors
            // Clear the form after submission
            setFormData({
                name: '',
                price: '',
                benefits: '',
                postVisibilityDays: '',
            });
        } catch (err) {
            console.error('Failed to create package: ', err);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Create a New Package</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Show error message */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium">
                            Package Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className=" bg-white mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter package name"
                            required
                        />
                    </div>

                    {/* Price Input */}
                    <div>
                        <label htmlFor="price" className="block text-gray-700 font-medium">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className=" bg-white mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter price"
                            required
                        />
                    </div>


                    {/* Benefits Input */}
                    <div>
                        <label htmlFor="benefits" className="block text-gray-700 font-medium">
                            Benefits
                        </label>
                        <textarea
                            id="benefits"
                            name="benefits"
                            value={formData.benefits}
                            onChange={handleInputChange}
                            className=" bg-white mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter benefits (optional)"
                        ></textarea>
                    </div>

                    {/* Post Visibility Days Input */}
                    <div>
                        <label htmlFor="postVisibilityDays" className="block text-gray-700 font-medium">
                            Post Visibility Days
                        </label>
                        <input
                            type="number"
                            id="postVisibilityDays"
                            name="postVisibilityDays"
                            value={formData.postVisibilityDays}
                            onChange={handleInputChange}
                            className=" bg-white mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter visibility days"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className={`w-full py-3 ${
                                loading ? 'bg-gray-500' : 'bg-indigo-600 hover:bg-indigo-700'
                            } text-white font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? 'Creating...' : 'Create Package'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePackageForm;
