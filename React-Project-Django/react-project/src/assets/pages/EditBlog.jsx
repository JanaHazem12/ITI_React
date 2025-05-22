import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { updateBlog } from "../../api";
import { Toaster, toast } from 'react-hot-toast';


export default function EditBlog() {
  const { id } = useParams();
  const { state } = useLocation();
  const { record } = state || {};
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    image: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    image: "",
    body: "",
    general: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!record) {
      navigate("/");
      return;
    }
    setFormData({
      title: record.title,
      body: record.body,
      image: record.image,
    });
  }, [record, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.body.trim()) {
      newErrors.body = "Body is required";
    }
    
    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required";
    } else {
      const imgRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
      if (!imgRegex.test(formData.image)) {
        newErrors.image = "Please enter a valid image URL";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    // if (errors[name]) {
    //   setErrors(prev => ({
    //     ...prev,
    //     [name]: "",
    //   }));
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // check authentication
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      await updateBlog(id, formData);
      navigate("/");
      toast.success('Blog updated successfully!');
    } catch (err) {
      // if(err.response.status === 401){
      //   toast.error('Token expired, Please login.');
      //   console.log("TOKEN EXPIRED !");
      //   navigate("/login");
      // }
      // if (err.response?.data) {
      //   const backendErrors = err.response.data;
      //   if (backendErrors.body) {
      //     setErrors(prev => ({
      //       ...prev,
      //       general: "Body is required." 
      //     }));
      //   } else {
      setErrors(prev => ({
        ...prev,
        general: err.response?.data?.detail || "Failed to update blog. Please try again."
      }));
    }
  // }
  };

  if (!record) {
    return null;
  }

  return (
    <>
      <Toaster position="top-center" />
      <div className="flex items-center justify-center font-font3 text-8xl text-purple-500 py-60">
        Edit Blog
      </div>
      <div className="flex items-center justify-center relative bottom-50">
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 border border-purple-500 p-6 bg-white"
        >
          {errors.general && (
            <p className="text-red-600 text-center mb-4">{errors.general}</p>
          )}
          <div>
            <div className="flex flex-col mb-3">
              <label htmlFor="title" className="text-purple-500">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                maxLength="40"
                className="px-3 py-2 bg-white border border-gray-900 focus:border-purple-500 focus:outline-none focus:text-purple-500"
                autoComplete="off"
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div className="flex flex-col mb-3">
              <label htmlFor="body" className="text-purple-500">
                Body
              </label>
              <textarea
                rows="4"
                id="body"
                name="body"
                value={formData.body}
                onChange={handleChange}
                maxLength="200"
                className="px-3 py-2 bg-white border border-gray-900 focus:border-purple-500 focus:outline-none focus:text-purple-500"
                autoComplete="off"
              />
              {errors.body && (
                <p className="text-red-600 text-sm mt-1">{errors.body}</p>
              )}
            </div>

            <div className="flex flex-col mb-3">
              <label htmlFor="image" className="text-purple-500">
                Image URL
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="px-3 py-2 bg-white border border-gray-900 focus:border-purple-500 focus:outline-none focus:text-purple-500"
                autoComplete="off"
              />
              {errors.image && (
                <p className="text-red-600 text-sm mt-1">{errors.image}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4 pt-3">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-1/2 bg-gray-200 text-gray-700 border border-gray-400 px-4 py-2 transition duration-50 focus:outline-none font-semibold hover:bg-gray-300 text-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 bg-purple-200 text-purple-500 border border-purple-500 px-4 py-2 transition duration-50 focus:outline-none font-semibold hover:bg-purple-500 hover:text-white text-xl cursor-pointer"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
}